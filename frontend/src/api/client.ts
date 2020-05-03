import { Message } from 'mathgame/protobuf/app_pb'
import { Join, Answer } from 'mathgame/protobuf/client_pb'
import { serializeMessage, getWsServerUrl } from 'helpers'

export class APIClient {
  socket: WebSocket
  playerId: string

  constructor(url: string | null = null, playerId: string) {
    if (!url) url = getWsServerUrl()
    this.socket = new WebSocket(url)
    this.playerId = playerId
  }

  join() {
    const payload = new Join()
    payload.setPlayerId(this.playerId)
    this.socket.send(serializeMessage(Message.Type.CLIENT_JOIN, payload))
  }

  answer(v: string) {
    const payload = new Answer()
    payload.setPlayerId(this.playerId)
    this.socket.send(serializeMessage(Message.Type.CLIENT_ANSWER, payload))
  }
}
