import React, { useEffect, useContext, useState } from 'react'
import { WSAPIContext } from './WSAPIContainer'
import { Response } from 'mathgame/protobuf/server_pb'
import { AppContext } from './AppContainer'

type Context = {
  started: boolean
  setStarted: (v: boolean) => void
}
export const GameContext = React.createContext<Context>({
  started: false,
  setStarted: (v) => {},
})

const onNewPlayerJoined = (playerId: string, resp: Response) => {
  const newPlayerId = resp.getNewPlayerJoined()?.getPlayerId()
  if (playerId !== newPlayerId) {
    console.log(`${newPlayerId}さんが入室しました`)
  }
}

export const GameContainer: React.FunctionComponent<{}> = ({ children }) => {
  const { playerId } = useContext(AppContext)
  const { wsApiRef, wsReady } = useContext(WSAPIContext)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const client = wsApiRef?.current
    if (!client || !wsReady) return
    const handler = (resp: Response) => {
      switch (resp.getType()) {
        case Response.Type.NEW_PLAYER_JOINED:
          onNewPlayerJoined(playerId, resp)
          break
        case Response.Type.GAME_STARTED:
          setStarted(true)
          break
        default:
          break
      }
    }

    client.onResponse(handler)
    return () => {
      client.offResponse(handler)
    }
  }, [wsApiRef, wsReady, playerId])

  const store = { started, setStarted }
  return <GameContext.Provider value={store}>{children}</GameContext.Provider>
}
