import asyncio
import logging
from typing import List

from mathgame.message_channel import channels
from mathgame.protobuf import server_pb2
from mathgame.protobuf.client_pb2 import Command
from mathgame.protobuf.server_pb2 import Response

from .player import Player, PlayerState
from .problem import Problem, ProblemGenerator

logger = logging.getLogger(__name__)


class RoomPlayers:
    def __init__(self):
        self._players = {}

    def add(self, player_id: str) -> Player:
        if player_id in self._players:
            return self.get(player_id)

        new_player = Player(id=player_id)
        self._players[player_id] = (new_player, PlayerState())
        return new_player

    def add_score(self, player_id: str, score: int):
        self._players[player_id][1].score += score

    def get(self, player_id: str) -> Player:
        return self._players[player_id][0]

    def get_winner(self) -> Player:
        assert len(self._players) >= 1
        orders = sorted(self._players.keys(), key=lambda x: -self._players[x][1].score)
        return self.get(orders[0])

    def get_scores(self) -> List[dict]:
        scores = []
        for (player, state) in self._players.values():
            scores.append({"player_id": player.id, "score": state.score})
        return scores

    def get_scores_as_protobuf(self) -> List[server_pb2.PlayerScore]:
        scores = self.get_scores()
        pb_scores = []
        for score in scores:
            pb_score = server_pb2.PlayerScore()
            pb_score.score = score["score"]
            pb_score.player_id = score["player_id"]
            pb_scores.append(pb_score)
        return pb_scores

    @property
    def num_players(self):
        return len(self._players)


class Room:
    def __init__(self):
        self._room_players = RoomPlayers()
        self._problems = None
        self._curr_problem_index = 0

        self._started = False
        self._finished = False

    def on_join_room(self, command: Command):
        assert command.type == Command.Type.JOIN_ROOM

        player = self._room_players.add(command.player_id)
        logger.info("[PLYAER_JOINED]: player={}".format(player))

        resp = Response()
        resp.type = Response.Type.NEW_PLAYER_JOINED
        resp.broadcast = True
        new_player_joined = server_pb2.NewPlayerJoined()
        new_player_joined.player_id = command.player_id
        resp.new_player_joined.CopyFrom(new_player_joined)
        channels.web.send(resp)

    def on_start_game(self, command: Command):
        assert command.type == Command.Type.START_GAME

        player = self._room_players.get(command.player_id)
        logger.info("[GAME_STARTED]: player={}".format(player))

        if not self._started:
            # 問題の初期化
            self._started = True
            start_game = command.start_game
            generator = ProblemGenerator(start_game.type)
            self._problems = generator.generate(start_game.num_problems)

        # Send GAME_STARTED
        resp = Response()
        resp.type = Response.Type.GAME_STARTED
        resp.broadcast = True
        channels.web.send(resp)

        self._send_problem()

    def on_answer(self, command: Command):
        assert command.type == Command.Type.ANSWER
        player = self._room_players.get(command.player_id)
        logger.info("[PLAYER_ANSWERED]: player={}".format(player))

        resp = Response()
        resp.type = Response.Type.ANSWER_RESULT
        resp.broadcast = True

        answer_result = server_pb2.AnswerResult()
        answer_result.player_id = command.player_id

        if self._curr_problem.is_correct(command.answer.answer):
            logger.info("[ANSWER_IS_CORRECT]: player={}".format(player))

            answer_result.correct = True
            answer_result.score = 1

            self._on_correct_answer(command.player_id, score=1)

            self._step()
            if self._finished:
                self._send_game_result()
            else:
                # TODO: 問題を送るをちょっと送らせたい
                self._send_problem()
        else:
            logger.info("[ANSWER_IS_WRONG]: player={}".format(player))
            answer_result.correct = False

        self._set_player_scores(answer_result)
        resp.answer_result.CopyFrom(answer_result)
        channels.web.send(resp)

    def _step(self):
        self._curr_problem_index += 1
        if self._curr_problem_index >= len(self._problems):
            self._finished = True
        self._curr_problem_index %= len(self._problems)

    def _on_correct_answer(self, player_id, score):
        self._room_players.add_score(player_id, score)

    def _send_game_result(self):
        resp = Response()
        resp.type = Response.Type.GAME_RESULT
        resp.broadcast = True

        game_result = server_pb2.GameResult()
        game_result.winner = self._room_players.get_winner().id

        self._set_player_scores(game_result)

        resp.game_result.CopyFrom(game_result)
        channels.web.send(resp)

    def _set_player_scores(self, result_pb):
        for player_score in self._room_players.get_scores_as_protobuf():
            result_pb.player_scores.append(player_score)

    def _send_problem(self):
        resp = Response()
        resp.type = Response.Type.PROBLEM
        resp.broadcast = True
        problem = self._curr_problem.to_protobuf()
        resp.problem.CopyFrom(problem)
        resp.problem.number = self._curr_problem_index + 1
        channels.web.send(resp)

    @property
    def finished(self) -> bool:
        return self._finished

    @property
    def _curr_problem(self) -> Problem:
        return self._problems[self._curr_problem_index]


class GameServer:
    def __init__(self):
        self.current_room = Room()

    def handle_command(self, command: Command):
        logger.info(f"[READ_MESSAGE]: {command}")

        if command.type == Command.Type.JOIN_ROOM:
            self.current_room.on_join_room(command)
        elif command.type == Command.Type.START_GAME:
            self.current_room.on_start_game(command)
        elif command.type == Command.Type.ANSWER:
            self.current_room.on_answer(command)
        else:
            raise NotImplementedError(str(command))

    async def run(self):
        fps = 60
        while True:
            try:
                commands = []

                while True:
                    command = channels.game.read()
                    if command is None:
                        break
                    commands.append(command)

                for command in commands:
                    self.handle_command(command)

                if self.current_room.finished:
                    self.current_room = Room()

            except Exception as e:
                logger.exception(e)

            await asyncio.sleep(1 / fps)


def start_game_server():
    game_server = GameServer()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(game_server.run())
