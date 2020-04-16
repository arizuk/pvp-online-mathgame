"""
Boot a web and game server
"""

import logging
import multiprocessing as mp
from multiprocessing import Process

from tashizan.game_server import start_game_server
from tashizan.message_channel import channels
from tashizan.web_server import start_web_server

logging.basicConfig(level="INFO")

if __name__ == "__main__":
    mp.set_start_method("fork")

    channels.game.init(mp.Queue())
    channels.web.init(mp.Queue())

    Process(target=start_web_server, args=()).start()
    Process(target=start_game_server, args=()).start()
