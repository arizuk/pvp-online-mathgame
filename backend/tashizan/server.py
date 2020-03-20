from starlette.applications import Starlette
from starlette.routing import Mount, WebSocketRoute
from starlette.staticfiles import StaticFiles

import asyncio
import uuid
import enum
from enum import auto
from typing import List


class Player:
    def __init__(self, id: str):
        self.id = id


class Match:
    def __init__(self):
        self._players = []

    @property
    def players(self):
        return self._players

    def add_player(self, player):
        self._players.append(player)

    def start(self):
        pass


class Status(enum.Enum):
    INIT = auto
    STARTED = auto


class Publisher:
    @classmethod
    async def publish(cls, connections, message):
        await asyncio.gather(*[c.send_text(message) for c in connections])


class Manager:
    def __init__(self):
        self._state = Status.INIT
        self._match = None
        self._clients = []

    async def add_client(self, conn):

        if self._match is None:
            self._match = Match()

        self._clients.append(conn)

    async def remove_client(self, conn):
        index = self._clients.index(conn)
        self._clients.pop(index)

    async def publish(self, message):
        await Publisher.publish(self._clients, message)


manager = Manager()


async def _add_client(conn):

    await manager.add_client(conn)
    await manager.publish(f"New player comes {conn}")


async def _remove_client(conn):
    await manager.remove_client(conn)


async def ws_handler(websocket):
    await websocket.accept()
    await _add_client(websocket)

    try:
        while True:
            message = await websocket.receive()
            if message["type"] == "websocket.receive":
                print(message["text"])
            else:
                print(message)
    except RuntimeError as e:
        print(e)
        await _remove_client(websocket)

    await websocket.close()


routes = [
    WebSocketRoute("/ws", ws_handler),
    Mount("/static", app=StaticFiles(directory="static"), name="static"),
]

app = Starlette(routes=routes, debug=True)
