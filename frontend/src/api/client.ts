import { Command, Answer, StartGame } from 'mathgame/protobuf/client_pb'
import { getWsServerUrl } from 'helpers'

type CommandType = Command.TypeMap[keyof Command.TypeMap]

export class WSAPIClinet {
  socket: WebSocket
  playerId: string

  constructor(url: string | null = null, playerId: string) {
    if (!url) url = getWsServerUrl()
    this.socket = new WebSocket(url)
    this.playerId = playerId
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
}
