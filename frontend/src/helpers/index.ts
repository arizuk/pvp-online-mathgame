import { Message } from '../mathgame/protobuf/app_pb'

type MessageType = Message.TypeMap[keyof Message.TypeMap]

export function serializeMessage(type: MessageType, payload: any) {
  const msg = new Message()
  msg.setType(type)

  switch (type) {
    case Message.Type.CLIENT_JOIN:
      msg.setJoin(payload)
      break
    case Message.Type.CLIENT_ANSWER:
      msg.setAnswer(payload)
      break
    default:
      throw new Error(`type is unexpected. type=${type}`)
  }
  return msg.serializeBinary()
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
