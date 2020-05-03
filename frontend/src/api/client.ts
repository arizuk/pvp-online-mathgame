import { Command, Answer } from 'mathgame/protobuf/client_pb'
import { serializeMessage, getWsServerUrl } from 'helpers'

export class APIClient {
  socket: WebSocket
  playerId: string

  constructor(url: string | null = null, playerId: string) {
    if (!url) url = getWsServerUrl()
    this.socket = new WebSocket(url)
    this.playerId = playerId
  }

  joinRoom() {
    this.socket.send(
      serializeMessage(Command.Type.JOIN_ROOM, this.playerId, null)
    )
  }

  answer(v: string) {
    const payload = new Answer()
    this.socket.send(
      serializeMessage(Command.Type.ANSWER, this.playerId, payload)
    )
  }
}
