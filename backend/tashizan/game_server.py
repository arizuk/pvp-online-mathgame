import asyncio
import logging
import uuid

from .message import GameMessageType, Message
from .message_channel import channels
from .player import Player, PlayerState
from .problem import ProblemSet, RandomAdditionFactory

logger = logging.getLogger(__name__)


class Match:
    def __init__(self, num_problems: int = 5):
        self._players = []
        self._player_states = {}
        self._problem_set = ProblemSet(RandomAdditionFactory.generate(num_problems))

    def on_join(self, message: Message):
        assert message.type == GameMessageType.JOIN

        logger.info("player joined")

        player = Player(id=str(uuid.uuid4()))
        self._players.append(player)
        self._player_states[player.id] = PlayerState()

    def on_answer(self, message: Message):
        assert message.type == GameMessageType.ANSWER

    def tick(self):
        logger.info("tick")
        logger.info(self._player_states)


class GameServer:
    def __init__(self):
        self.current_match = Match()

    def handle_message(self, message: Message):
        print(f"[Game] read {message}")

        if message.type == GameMessageType.JOIN:
            self.current_match.on_join(message)
        elif message.type == GameMessageType.ANSWER:
            self.current_match.on_answer(message)
        else:
            raise RuntimeError("unknown message")

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
