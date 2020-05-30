import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from 'components/AppContainer'
import PageLink from 'components/PageLink'
import { GameContext } from 'components/GameContainer'
import { WSAPIContext } from 'components/WSAPIContainer'
import { FaRegThumbsUp } from 'react-icons/fa'
import Modal from 'react-modal'
import { StartGame } from 'mathgame/protobuf/client_pb'
import * as server_pb from 'mathgame/protobuf/server_pb'

import './Home.css'

type ProblemType = StartGame.TypeMap[keyof StartGame.TypeMap]

const customStyles = {
  content: {
    padding: 0,
  },
}

type ModalGameStartProps = {
  startGame: (type: ProblemType, numProblems: number) => void
  closeModal: () => void
}
function ModalGameStart({ startGame, closeModal }: ModalGameStartProps) {
  const [numProblems, setNumProblems] = useState(5)
  const [type, setType] = useState<ProblemType>(server_pb.Problem.Type.ADDITION)

  const typeOptions = [
    {
      value: server_pb.Problem.Type.ADDITION,
      text: 'たしざん',
    },
    {
      value: server_pb.Problem.Type.SUBTRACTION,
      text: 'ひきざん',
    },
    {
      value: server_pb.Problem.Type.MULTIPLICATION,
      text: 'かけざん',
    },
  ]

  return (
    <div className="Home-gameStartModal">
      <div className="modalTitle">ゲームのせってい</div>
      <div className="types">
        {typeOptions.map((v) => (
          <div>
            <button
              className={type === v.value ? 'selected' : ''}
              onClick={() => setType(v.value)}
            >
              {v.text}
            </button>
          </div>
        ))}
      </div>
      <div className="selectBoxWrap">
        <div className="selectBox">
          <select
            value={numProblems}
            onChange={(ev) => setNumProblems(parseInt(ev.target.value, 10))}
          >
            {[1, 3, 5, 10].map((num) => (
              <option key={num} value={num}>
                {num}問
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <button className="button" onClick={() => startGame(type, numProblems)}>
          ゲームスタート
        </button>
      </div>
      <div>
        <button className="button gray" onClick={() => closeModal()}>
          とじる
        </button>
      </div>
    </div>
  )
}

function Lobby() {
  const { playerId } = useContext(AppContext)
  const { wsReady, wsApiRef } = useContext(WSAPIContext)
  const { setStarted, notification, setRoomJoined } = useContext(GameContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // TODO: check current state
  const startGame = (type: ProblemType, numProblems: number) => {
    if (wsReady) {
      setStarted(true)
      wsApiRef?.current?.startGame(type, numProblems)
    }
  }

  useEffect(() => {
    if (wsReady) {
      setRoomJoined(true)
      wsApiRef?.current?.joinRoom()
    }
  }, [wsReady, wsApiRef, setRoomJoined])

  return (
    <div>
      <h1 className="title">みんなで!さんすう!</h1>
      <div className="content">
        {notification ? (
          <div className="notification">
            <div className="item">
              {notification}
              &nbsp;
              <FaRegThumbsUp />
            </div>
          </div>
        ) : null}
        <div className="playerInfo">
          <div className="item label">なまえ</div>
          <div className="item name">
            <PageLink to="playerEdit">{playerId}</PageLink>
          </div>
        </div>

        <div className="Home-gameStart">
          <div>
            <button className="button" onClick={() => setIsModalOpen(true)}>
              ゲームスタート
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <div>wsReady: {String(wsReady)}</div>
      </div>

      <Modal isOpen={isModalOpen} style={customStyles}>
        <ModalGameStart
          startGame={startGame}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

function Home() {
  return <Lobby />
}
export default Home
