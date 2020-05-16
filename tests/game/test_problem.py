from mathgame.game.problem import Addition, RandomAdditionFactory
from mathgame.protobuf import server_pb2


def test_addition():
    addtion = Addition(x=1, y=2)
    assert not addtion.is_correct(2)
    assert addtion.is_correct(3)


def test_addition_to_protobuf():
    addtion = Addition(x=1, y=2)
    pb = addtion.to_protobuf()
    assert pb.type == server_pb2.Problem.Type.ADDITION
    assert pb.addition
    assert pb.addition.x == 1
    assert pb.addition.y == 2


def test_random_additon_factory():
    additions = RandomAdditionFactory.generate(3)
    assert len(additions) == 3
