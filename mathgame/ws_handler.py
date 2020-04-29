from starlette.endpoints import WebSocketEndpoint
from starlette.websockets import WebSocket

from .message_channel import channels
from .protobuf import app_pb2
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
        pb_msg = app_pb2.Message()
        pb_msg.ParseFromString(data)
        channels.game.send(pb_msg)

        import time

        print("handle ws message")
        channels.web.send({"hello": str(time.time())})
