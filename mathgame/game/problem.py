import random
from abc import ABCMeta, abstractmethod

from mathgame.protobuf import server_pb2


class Problem(metaclass=ABCMeta):
    @abstractmethod
    def is_correct(self, answer: int):
        pass

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

        binary = server_pb2.Binary()
        binary.x = self.x
        binary.y = self.y
        prob.binary.CopyFrom(binary)
        return prob


class Subtraction(Problem):
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y
        self._answer = self.x - self.y

    def is_correct(self, answer: int) -> bool:
        return self._answer == answer

    def to_protobuf(self):
        prob = server_pb2.Problem()
        prob.type = server_pb2.Problem.Type.SUBTRACTION

        binary = server_pb2.Binary()
        binary.x = self.x
        binary.y = self.y
        prob.binary.CopyFrom(binary)
        return prob


class Multiplication(Problem):
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y
        self._answer = self.x * self.y

    def is_correct(self, answer: int) -> bool:
        return self._answer == answer

    def to_protobuf(self):
        prob = server_pb2.Problem()
        prob.type = server_pb2.Problem.Type.MULTIPLICATION

        binary = server_pb2.Binary()
        binary.x = self.x
        binary.y = self.y
        prob.binary.CopyFrom(binary)
        return prob


def generate_addition(num):
    probs = []
    for _ in range(num):
        x = random.randint(0, 30)
        y = random.randint(1, 10)
        probs.append(Addition(x=x, y=y))
    return probs


def generate_subtraction(num):
    probs = []
    for _ in range(num):
        x = random.randint(3, 10)
        y = random.randint(1, 3)
        probs.append(Subtraction(x=x, y=y))
    return probs


def generate_multiplication(num):
    probs = []
    for _ in range(num):
        x = random.randint(1, 9)
        probs.append(Multiplication(x=x, y=x))
    return probs


class ProblemGenerator:
    def __init__(self, type):
        self._type = type
        print("type: {self._type}")

    def generate(self, num):
        if self._type == server_pb2.Problem.Type.ADDITION:
            return generate_addition(num)
        elif self._type == server_pb2.Problem.Type.SUBTRACTION:
            return generate_subtraction(num)
        elif self._type == server_pb2.Problem.Type.MULTIPLICATION:
            return generate_multiplication(num)
        else:
            raise NotImplementedError()
