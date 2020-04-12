from dataclasses import dataclass


@dataclass
class PlayerState:
    score: int = 0


@dataclass
class Player:
    id: str
