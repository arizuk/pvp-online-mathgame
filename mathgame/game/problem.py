import random
from abc import ABCMeta, abstractmethod

from mathgame.protobuf import server_pb2


class Problem(metaclass=ABCMeta):
    @abstractmethod
    def to_protobuf(self):
        pass


class Addition(Problem):
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y
        self._answer = self.x + self.y

    def is_correct(self, answer: int) -> bool:
        return self._answer == answer

    def to_protobuf(self):
        prob = server_pb2.Problem()
        prob.type = server_pb2.Problem.Type.ADDITION

        addition = server_pb2.Addition()
        addition.x = self.x
        addition.y = self.y
        prob.addition.CopyFrom(addition)
        return prob


class RandomAdditionFactory:
    @classmethod
    def generate(cls, num):
        probs = []
        for _ in range(num):
            x = random.randint(0, 30)
            y = random.randint(1, 10)
            probs.append(Addition(x=x, y=y))
        return probs
