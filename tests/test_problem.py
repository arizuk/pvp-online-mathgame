from mathgame.problem import Addition, RandomAdditionFactory


def test_addition():
    addtion = Addition(x=1, y=2)
    assert not addtion.is_correct(2)
    assert addtion.is_correct(3)


def test_random_additon_factory():
    additions = RandomAdditionFactory.generate(3)
    assert len(additions) == 3
