import asyncio
import logging
import uuid

from .message_channel import channels
from .player import Player, PlayerState
from .problem import ProblemSet, RandomAdditionFactory
from .protobuf import app_pb2, client_pb2

logger = logging.getLogger(__name__)


class Match:
    def __init__(self, num_problems: int = 5):
        self._players = []
        self._player_states = {}
        self._problem_set = ProblemSet(RandomAdditionFactory.generate(num_problems))

    def on_join(self, message: app_pb2.Message):
        assert message.type == app_pb2.Message.Type.CLIENT_JOIN
        join: client_pb2.Join = message.join
        player = Player(id=join.player_id)

        logger.info("[PLYAER_JOINED]: player={}".format(player))
        self._players.append(player)
        self._player_states[player.id] = PlayerState()

    def on_answer(self, message: app_pb2.Message):
        assert message.type == app_pb2.Message.Type.CLIENT_ANSWER
        answer: client_pb2.Answer = message.answer
        player = self._get_player(answer.player_id)
        logger.info("[PLAYER_ANSWERED]: player={}".format(player))

    def _get_player(self, player_id: str) -> Player:
        for player in self._players:
            if player.id == player_id:
                return player
        raise RuntimeError()

    def tick(self):
        pass


class GameServer:
    def __init__(self):
        self.current_match = Match()

    def handle_message(self, message: app_pb2.Message):
        logger.info(f"[READ_MESSAGE]: {message}")

        if message.type == app_pb2.Message.Type.CLIENT_JOIN:
            self.current_match.on_join(message)
        elif message.type == app_pb2.Message.Type.CLIENT_ANSWER:
            self.current_match.on_answer(message)
        else:
            raise NotImplementedError(str(message))

    async def run(self):
        while True:
            messages = []

            while True:
                message = channels.game.read()
                if message is None:
                    break
                messages.append(message)

            for message in messages:
                self.handle_message(message)

            if self.current_match:
                self.current_match.tick()

            await asyncio.sleep(0.5)


def start_game_server():
    game_server = GameServer()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(game_server.run())
