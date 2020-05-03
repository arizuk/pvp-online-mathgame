import asyncio
import logging
import uuid

from .message_channel import channels
from .player import Player, PlayerState
from .problem import ProblemSet, RandomAdditionFactory
from .protobuf.client_pb2 import Command

logger = logging.getLogger(__name__)


class Match:
    def __init__(self, num_problems: int = 5):
        self._players = []
        self._player_states = {}
        self._problem_set = ProblemSet(RandomAdditionFactory.generate(num_problems))

    def on_join_room(self, command: Command):
        assert command.type == Command.Type.JOIN_ROOM
        player = Player(id=command.player_id)

        logger.info("[PLYAER_JOINED]: player={}".format(player))
        self._players.append(player)
        self._player_states[player.id] = PlayerState()

    def on_answer(self, command: Command):
        assert command.type == Command.Type.ANSWER
        player = self._get_player(command.player_id)
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

    def handle_command(self, command: Command):
        logger.info(f"[READ_MESSAGE]: {command}")

        if command.type == Command.Type.JOIN_ROOM:
            self.current_match.on_join_room(command)
        elif command.type == Command.Type.ANSWER:
            self.current_match.on_answer(command)
        else:
            raise NotImplementedError(str(command))

    async def run(self):
        while True:
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

            await asyncio.sleep(0.5)


def start_game_server():
    game_server = GameServer()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(game_server.run())
