import { Command } from '../mathgame/protobuf/client_pb'

type CommandType = Command.TypeMap[keyof Command.TypeMap]

export function serializeMessage(
  type: CommandType,
  playerId: string,
  payload: any
) {
  const cmd = new Command()
  cmd.setType(type)
  cmd.setPlayerId(playerId)

  switch (type) {
    case Command.Type.JOIN_ROOM:
      break
    case Command.Type.START_GAME:
      cmd.setStartGame(payload)
      break
    case Command.Type.ANSWER:
      cmd.setAnswer(payload)
      break
    default:
      throw new Error(`type is unexpected. type=${type}`)
  }
  return cmd.serializeBinary()
}

export const getWsServerUrl = () => {
  const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  let { host, port } = window.location

  // XXX: portが3000の場合はwebpack devserver経由だと判断する
  const devPort = '3000'
  if (port === devPort) {
    host = host.replace(devPort, '8000')
  }
  return `${protocolPrefix}//${host}/ws`
}
