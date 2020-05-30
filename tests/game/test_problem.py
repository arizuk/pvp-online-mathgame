from mathgame.game.problem import Addition, Multiplication, Subtraction
from mathgame.protobuf import server_pb2


def test_addition():
    prob = Addition(x=1, y=2)
    assert not prob.is_correct(2)
    assert prob.is_correct(3)


def test_addition_to_protobuf():
    prob = Addition(x=1, y=2)
    pb = prob.to_protobuf()
    assert pb.type == server_pb2.Problem.Type.ADDITION
    assert pb.binary
    assert pb.binary.x == 1
    assert pb.binary.y == 2


def test_subtraction():
    prob = Subtraction(x=3, y=2)
    assert not prob.is_correct(2)
    assert prob.is_correct(1)


def test_subtraction_to_protobuf():
    prob = Subtraction(x=1, y=2)
    pb = prob.to_protobuf()
    assert pb.type == server_pb2.Problem.Type.SUBTRACTION
    assert pb.binary
    assert pb.binary.x == 1
    assert pb.binary.y == 2


def test_multiplication():
    prob = Multiplication(x=3, y=2)
    assert not prob.is_correct(5)
    assert prob.is_correct(6)


def test_multiplication_to_protobuf():
    prob = Multiplication(x=1, y=2)
    pb = prob.to_protobuf()
    assert pb.type == server_pb2.Problem.Type.MULTIPLICATION
    assert pb.binary
    assert pb.binary.x == 1
    assert pb.binary.y == 2
