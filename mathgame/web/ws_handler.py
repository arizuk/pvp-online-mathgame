from starlette.endpoints import WebSocketEndpoint
from starlette.websockets import WebSocket

from mathgame.message_channel import channels
from mathgame.protobuf import client_pb2, server_pb2

from .ws_connection import ConnectionManager


async def handle_web_message(message):
    await ConnectionManager.publish(message)


class WsHandler(WebSocketEndpoint):
    encoding = "bytes"

    def __init__(self, *args, **kw_args):
        super().__init__(*args, **kw_args)
        self._connection_manager = ConnectionManager.get_instance()

    async def on_connect(self, websocket: WebSocket):
        await websocket.accept()
        await self._connection_manager.add(websocket)

    async def on_disconnect(self, websocket: WebSocket, close_code: int):
        await self._connection_manager.remove(websocket)

    async def on_receive(self, ws, data):
        command = client_pb2.Command()
        command.ParseFromString(data)
        channels.game.send(command)
