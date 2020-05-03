import random
from abc import ABCMeta
from typing import List


class Problem(metaclass=ABCMeta):
    pass


class Addition(Problem):
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y
        self._answer = self.x + self.y

    def is_correct(self, answer: int) -> bool:
        return self._answer == answer


class RandomAdditionFactory:
    @classmethod
    def generate(cls, num):
        probs = []
        for _ in range(num):
            x = random.randint(0, 30)
            y = random.randint(1, 10)
            probs.append(Addition(x=x, y=y))
        return probs


class ProblemSet:
    def __init__(self, problems: List[Problem]):
        self._problems = problems
