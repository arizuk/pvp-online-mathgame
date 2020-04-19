// package: mathgame.protobuf
// file: mathgame/protobuf/app.proto

import * as jspb from "google-protobuf";
import * as mathgame_protobuf_client_pb from "../../mathgame/protobuf/client_pb";

export class Message extends jspb.Message {
  getType(): Message.TypeMap[keyof Message.TypeMap];
  setType(value: Message.TypeMap[keyof Message.TypeMap]): void;

  hasJoin(): boolean;
  clearJoin(): void;
  getJoin(): mathgame_protobuf_client_pb.Join | undefined;
  setJoin(value?: mathgame_protobuf_client_pb.Join): void;

  hasAnswer(): boolean;
  clearAnswer(): void;
  getAnswer(): mathgame_protobuf_client_pb.Answer | undefined;
  setAnswer(value?: mathgame_protobuf_client_pb.Answer): void;

  getPayloadCase(): Message.PayloadCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    type: Message.TypeMap[keyof Message.TypeMap],
    join?: mathgame_protobuf_client_pb.Join.AsObject,
    answer?: mathgame_protobuf_client_pb.Answer.AsObject,
  }

  export interface TypeMap {
    CLIENT_JOIN: 0;
    CLIENT_ANSWER: 1;
  }

  export const Type: TypeMap;

  export enum PayloadCase {
    PAYLOAD_NOT_SET = 0,
    JOIN = 2,
    ANSWER = 3,
  }
}

