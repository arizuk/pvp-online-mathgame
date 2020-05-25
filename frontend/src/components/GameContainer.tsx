import React, { useState, useContext, useEffect } from 'react'
import { WSAPIContext } from './WSAPIContainer'
import * as server_pb from 'mathgame/protobuf/server_pb'
import { AppContext } from './AppContainer'

type Context = {
  started: boolean
  setStarted: (v: boolean) => void
  notification: string

  problem: server_pb.Problem | null
  answerResult: server_pb.AnswerResult | null
  gameResult: server_pb.GameResult | null
}
export const GameContext = React.createContext<Context>({
  started: false,
  setStarted: (v) => {},
  notification: '',

  problem: null,
  answerResult: null,
  gameResult: null,
})

export const GameContainer: React.FunctionComponent<{}> = ({ children }) => {
  const { playerId } = useContext(AppContext)
  const [started, setStarted] = useState(false)

  const { wsReady, wsApiRef } = useContext(WSAPIContext)
  const [notification, setNotification] = useState('')

  const [problem, setProblem] = useState<server_pb.Problem | null>(null)
  const [
    answerResult,
    setAnswerResult,
  ] = useState<server_pb.AnswerResult | null>(null)
  const [gameResult, setGameResult] = useState<server_pb.GameResult | null>(
    null
  )

  useEffect(() => {
    const client = wsApiRef?.current
    if (!client || !wsReady) return

    const handler = (resp: server_pb.Response) => {
      switch (resp.getType()) {
        case server_pb.Response.Type.NEW_PLAYER_JOINED:
          const newPlayerId = resp.getNewPlayerJoined()?.getPlayerId()
          if (playerId !== newPlayerId) {
            const message = `${newPlayerId}さんが入室しました`
            setNotification(message)
          }
          break
        case server_pb.Response.Type.GAME_STARTED:
          setStarted(true)
          break
        case server_pb.Response.Type.PROBLEM:
          const respProblem = resp.getProblem()
          if (respProblem) setProblem(respProblem)
          break
        case server_pb.Response.Type.ANSWER_RESULT:
          const respAnswerResult = resp.getAnswerResult()
          if (respAnswerResult) setAnswerResult(respAnswerResult)
          break
        case server_pb.Response.Type.GAME_RESULT:
          const respGameResult = resp.getGameResult()
          if (respGameResult) setGameResult(respGameResult)
          break
        default:
          break
      }
    }
    client.addResponseListener(handler)
    return () => {
      client.removeResponseListener(handler)
    }
  }, [wsApiRef, wsReady, playerId])

  const store = {
    started,
    setStarted,
    notification,
    problem,
    gameResult,
    answerResult,
  }
  return <GameContext.Provider value={store}>{children}</GameContext.Provider>
}
