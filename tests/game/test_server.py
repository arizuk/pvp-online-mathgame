from mathgame.game.server import RoomPlayers


def test_room_players():
    match_players = RoomPlayers()
    p1 = match_players.add("p1")
    assert p1.id == "p1"
    assert match_players.num_players == 1

    p1 = match_players.add("p1")
    assert p1.id == "p1"
    assert match_players.num_players == 1

    p2 = match_players.add("p2")
    assert p2.id == "p2"
    assert match_players.num_players == 2

    p2 = match_players.get("p2")
    assert p2.id == "p2"

    match_players.add("p3")

    scores = [
        ("p1", 1),
        ("p1", 2),
        ("p3", 5),
        ("p2", 4),
    ]
    for p, score in scores:
        match_players.add_score(p, score)
    assert match_players.get_winner().id == "p3"
    assert match_players.get_scores(), [
        {"player_id": "p1", "score": 3},
        {"player_id": "p2", "score": 4},
        {"player_id": "p3", "score": 5},
    ]
