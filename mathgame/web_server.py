import asyncio
import json

import uvicorn
from starlette.applications import Starlette
from starlette.routing import Mount, WebSocketRoute
from starlette.staticfiles import StaticFiles

from .message_channel import channels
from .protobuf import app_pb2, client_pb2


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
    pb_msg = app_pb2.Message()
    pb_msg.ParseFromString(message["bytes"])

    if pb_msg.type == app_pb2.Message.Type.CLIENT_JOIN:
        channels.game.send(pb_msg)
    else:
        raise NotImplementedError(str(pb_msg))


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
