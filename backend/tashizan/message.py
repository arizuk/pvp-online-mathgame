from collections import namedtuple
from enum import Enum, auto

Message = namedtuple("Message", ["type", "payload"])


class GameMessageType(Enum):
    JOIN = auto()
    ANSWER = auto()


class WebMessageType(Enum):
    pass
