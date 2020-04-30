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
