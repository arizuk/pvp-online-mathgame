import { Command, Answer, StartGame } from 'mathgame/protobuf/client_pb'
import { Response as ServerResponse } from 'mathgame/protobuf/server_pb'

type CommandType = Command.TypeMap[keyof Command.TypeMap]
type Listener = (event: ServerResponse) => void

export class WSAPIClient {
  socket: WebSocket
  playerId: string
  listeners: Array<Listener>

  constructor(url: string, playerId: string) {
    this.socket = new WebSocket(url)
    this.playerId = playerId
    this.socket.addEventListener('message', (ev) => this.parseResponse(ev))
    this.listeners = []
  }

  private newCommand(type: CommandType) {
    const cmd = new Command()
    cmd.setType(type)
    cmd.setPlayerId(this.playerId)
    return cmd
  }

  private send(cmd: Command) {
    this.socket.send(cmd.serializeBinary())
  }

  joinRoom() {
    const cmd = this.newCommand(Command.Type.JOIN_ROOM)
    this.send(cmd)
  }

  startGame() {
    const cmd = this.newCommand(Command.Type.START_GAME)
    const payload = new StartGame()
    cmd.setStartGame(payload)
    payload.setType(StartGame.Type.ADDITION)
    this.send(cmd)
  }

  answer(v: string) {
    const cmd = this.newCommand(Command.Type.ANSWER)
    const payload = new Answer()
    cmd.setAnswer(payload)
    this.send(cmd)
  }

  onResponse(listener: Listener) {
    this.listeners.push(listener)
  }
  offResponse(listener: Listener) {
    const index = this.listeners.findIndex((l) => l === listener)
    if (index >= 0) {
      this.listeners.splice(index, 1)
    }
  }

  private parseResponse(event: MessageEvent) {
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      const buffer = event.target!.result as ArrayBuffer
      const binary = new Uint8Array(buffer)
      const response = ServerResponse.deserializeBinary(binary)
      this.dispatch(response)
    }
    fileReader.readAsArrayBuffer(event.data)
  }

  dispatch(response: ServerResponse) {
    this.listeners.forEach((l) => l(response))
  }
}
