import multiprocessing as mp
import queue
from typing import Any, Optional


class Channel:
    def __init__(self):
        self._queue = None

    def init(self, queue: mp.Queue):
        self._queue = queue

    def send(self, message: Any):
        if self._queue is None:
            return None

        self._queue.put(message)

    def read(self) -> Optional[Any]:
        if self._queue is None:
            return None

        try:
            message = self._queue.get_nowait()
            return message
        except queue.Empty:
            return None


class Channels:
    def __init__(self):
        self.game = Channel()
        self.web = Channel()


channels = Channels()
