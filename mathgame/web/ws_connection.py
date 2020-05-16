import asyncio

from mathgame.protobuf.server_pb2 import Response


class ConnectionManager:
    """Handles websocket connections
    """

    @classmethod
    def get_instance(cls):
        if not hasattr(cls, "_instance"):
            cls._instance = ConnectionManager()
        return cls._instance

    @classmethod
    async def publish(cls, message):
        await cls.get_instance()._publish(message)

    def __init__(self):
        self._connections = []

    async def add(self, conn):
        self._connections.append(conn)

    async def remove(self, conn):
        index = self._connections.index(conn)
        self._connections.pop(index)

    async def _publish(self, message: Response):
        res_bytes = message.SerializeToString()
        await asyncio.gather(*[c.send_bytes(res_bytes) for c in self._connections])
