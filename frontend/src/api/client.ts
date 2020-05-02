import { Message } from 'mathgame/protobuf/app_pb'
import { Join, Answer } from 'mathgame/protobuf/client_pb'
import { serializeMessage, getWsServerUrl } from 'helpers'

export class APIClient {
  socket: WebSocket

  constructor(url: string | null = null) {
    if (!url) url = getWsServerUrl()
    this.socket = new WebSocket(url)
  }

  join(playerId: string) {
    const join = new Join()
    join.setPlayerId(playerId)
    this.socket.send(serializeMessage(Message.Type.CLIENT_JOIN, join))
  }
}
