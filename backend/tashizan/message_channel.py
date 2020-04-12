import multiprocessing as mp
import queue
from typing import Any


class Channel:
    def __init__(self):
        self._queue = None

    def init(self, queue: mp.Queue) -> None:
        self._queue = queue

    def send(self, message: Any) -> None:
        self._queue.put(message)

    def read(self):
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
