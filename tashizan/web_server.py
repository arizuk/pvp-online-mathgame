import asyncio
import json

import uvicorn
from starlette.applications import Starlette
from starlette.routing import Mount, WebSocketRoute
from starlette.staticfiles import StaticFiles

from .message import GameMessageType, Message
from .message_channel import channels


class ConnectionManager:
    def __init__(self):
        self._connections = []

    async def add(self, conn):
        self._connections.append(conn)

    async def remove(self, conn):
        index = self._connections.index(conn)
        self._connections.pop(index)


class Publisher:
    @classmethod
    async def publish(self, connections: list, message):
        await asyncio.gather(*[c.send_text(message) for c in connections])


connection_manger = ConnectionManager()


def handle_ws_message(message):
    if message["type"] != "websocket.receive":
        print(f"Unknown message={message}")
        return

    data = json.loads(message["text"])
    msg_type = data["type"]
    payload = data["payload"]

    if msg_type == "JOIN":
        channels.game.send(Message(type=GameMessageType.JOIN, payload=payload))
    else:
        raise RuntimeError(f"unknown message={data}")


async def ws_handler(websocket):
    await websocket.accept()
    await connection_manger.add(websocket)

    try:
        while True:
            message = await websocket.receive()
            handle_ws_message(message)

    except RuntimeError as e:
        print(e)
        await connection_manger.remove(websocket)

    await websocket.close()


routes = [
    WebSocketRoute("/ws", ws_handler),
    Mount("/", app=StaticFiles(directory="frontend/build", html=True), name="static"),
]
app = Starlette(routes=routes, debug=True)


def start_web_server():
    uvicorn.run(app, debug=True)
