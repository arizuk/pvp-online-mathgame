// package: mathgame.protobuf
// file: mathgame/protobuf/client.proto

import * as jspb from "google-protobuf";

export class Command extends jspb.Message {
  getType(): Command.TypeMap[keyof Command.TypeMap];
  setType(value: Command.TypeMap[keyof Command.TypeMap]): void;

  getPlayerId(): string;
  setPlayerId(value: string): void;

  hasAnswer(): boolean;
  clearAnswer(): void;
  getAnswer(): Answer | undefined;
  setAnswer(value?: Answer): void;

  getPayloadCase(): Command.PayloadCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Command.AsObject;
  static toObject(includeInstance: boolean, msg: Command): Command.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Command, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Command;
  static deserializeBinaryFromReader(message: Command, reader: jspb.BinaryReader): Command;
}

export namespace Command {
  export type AsObject = {
    type: Command.TypeMap[keyof Command.TypeMap],
    playerId: string,
    answer?: Answer.AsObject,
  }

  export interface TypeMap {
    JOIN_ROOM: 0;
    ANSWER: 1;
  }

  export const Type: TypeMap;

  export enum PayloadCase {
    PAYLOAD_NOT_SET = 0,
    ANSWER = 11,
  }
}

export class Answer extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Answer.AsObject;
  static toObject(includeInstance: boolean, msg: Answer): Answer.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Answer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Answer;
  static deserializeBinaryFromReader(message: Answer, reader: jspb.BinaryReader): Answer;
}

export namespace Answer {
  export type AsObject = {
  }
}

