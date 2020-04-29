import asyncio
import os

import uvicorn
from starlette.applications import Starlette
from starlette.responses import PlainTextResponse
from starlette.routing import Mount, Route, WebSocketRoute
from starlette.staticfiles import StaticFiles

from .message_channel import channels
from .ws_handler import WsHandler, handle_web_message


def pong(requests):
    return PlainTextResponse("pong")


async def polling_web_channel(fps: int):
    while True:
        while True:
            message = channels.web.read()
            if message is None:
                break
            await handle_web_message(message)
        await asyncio.sleep(1 / fps)


async def on_server_startup():
    asyncio.create_task(polling_web_channel(fps=10))

    if os.environ.get("WEB_DEBUG", False):
        import multiprocessing as mp

        channels.web.init(mp.Queue())
        channels.game.init(mp.Queue())


routes = [
    WebSocketRoute("/ws", WsHandler),
    Route("/ping", pong),
    Mount("/", app=StaticFiles(directory="frontend/build", html=True), name="static"),
]
app = Starlette(routes=routes, debug=True, on_startup=[on_server_startup])


def start_web_server(**kw_args):
    uvicorn.run(app, debug=True, **kw_args)
