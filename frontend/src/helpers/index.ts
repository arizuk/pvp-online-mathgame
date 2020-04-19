import { Message } from "../mathgame/protobuf/app_pb"

type MessageType = Message.TypeMap[keyof Message.TypeMap]

export function serializeMessage(type: MessageType, payload: any) {
    const msg = new Message()
    msg.setType(type)

    switch (type) {
        case Message.Type.CLIENT_JOIN:
            msg.setJoin(payload)
            break
        default:
            msg.setAnswer(payload)
            break
    }
    return msg.serializeBinary()
}