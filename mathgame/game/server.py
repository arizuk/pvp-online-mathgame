import asyncio
import logging

from mathgame.message_channel import channels
from mathgame.protobuf import server_pb2
from mathgame.protobuf.client_pb2 import Command
from mathgame.protobuf.server_pb2 import Response

from .player import Player, PlayerState
from .problem import Problem, RandomAdditionFactory

logger = logging.getLogger(__name__)


class Match:
    def __init__(self, num_problems: int = 5):
        self._players = []
        self._player_states = {}
        self._problems = RandomAdditionFactory.generate(num_problems)
        self._curr_problem_index = 0

    def on_join_room(self, command: Command):
        assert command.type == Command.Type.JOIN_ROOM
        player = Player(id=command.player_id)

        logger.info("[PLYAER_JOINED]: player={}".format(player))
        self._players.append(player)
        self._player_states[player.id] = PlayerState()

        resp = Response()
        resp.type = Response.Type.NEW_PLAYER_JOINED
        resp.broadcast = True
        new_player_joined = server_pb2.NewPlayerJoined()
        new_player_joined.player_id = command.player_id
        resp.new_player_joined.CopyFrom(new_player_joined)
        channels.web.send(resp)

    def on_start_game(self, command: Command):
        assert command.type == Command.Type.START_GAME
        player = self._get_player(command.player_id)
        logger.info("[GAME_STARTED]: player={}".format(player))

        # Send GAME_STARTED
        resp = Response()
        resp.type = Response.Type.GAME_STARTED
        resp.broadcast = True
        channels.web.send(resp)

        self._send_problem()

    def on_answer(self, command: Command):
        assert command.type == Command.Type.ANSWER
        player = self._get_player(command.player_id)
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

            self._step()
            self._send_problem()
        else:
            logger.info("[ANSWER_IS_WRONG]: player={}".format(player))
            answer_result.correct = False

        resp.answer_result.CopyFrom(answer_result)
        channels.web.send(resp)

    def _get_player(self, player_id: str) -> Player:
        for player in self._players:
            if player.id == player_id:
                return player
        raise RuntimeError()

    def _step(self):
        self._curr_problem_index += 1
        self._curr_problem_index %= len(self._problems)

    def _send_problem(self):
        resp = Response()
        resp.type = Response.Type.PROBLEM
        resp.broadcast = True
        problem = self._curr_problem.to_protobuf()
        resp.problem.CopyFrom(problem)
        resp.problem.number = self._curr_problem_index + 1
        channels.web.send(resp)

    @property
    def _curr_problem(self) -> Problem:
        return self._problems[self._curr_problem_index]

    def tick(self):
        pass


class GameServer:
    def __init__(self):
        self.current_match = Match()

    def handle_command(self, command: Command):
        logger.info(f"[READ_MESSAGE]: {command}")

        if command.type == Command.Type.JOIN_ROOM:
            self.current_match.on_join_room(command)
        elif command.type == Command.Type.START_GAME:
            self.current_match.on_start_game(command)
        elif command.type == Command.Type.ANSWER:
            self.current_match.on_answer(command)
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

                if self.current_match:
                    self.current_match.tick()
            except Exception as e:
                logger.exception(e)

            await asyncio.sleep(1 / fps)


def start_game_server():
    game_server = GameServer()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(game_server.run())
