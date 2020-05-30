// package: mathgame.protobuf
// file: mathgame/protobuf/server.proto

import * as jspb from "google-protobuf";

export class Response extends jspb.Message {
  getType(): Response.TypeMap[keyof Response.TypeMap];
  setType(value: Response.TypeMap[keyof Response.TypeMap]): void;

  getBroadcast(): boolean;
  setBroadcast(value: boolean): void;

  getDestinationId(): string;
  setDestinationId(value: string): void;

  hasNewPlayerJoined(): boolean;
  clearNewPlayerJoined(): void;
  getNewPlayerJoined(): NewPlayerJoined | undefined;
  setNewPlayerJoined(value?: NewPlayerJoined): void;

  hasProblem(): boolean;
  clearProblem(): void;
  getProblem(): Problem | undefined;
  setProblem(value?: Problem): void;

  hasAnswerResult(): boolean;
  clearAnswerResult(): void;
  getAnswerResult(): AnswerResult | undefined;
  setAnswerResult(value?: AnswerResult): void;

  hasGameResult(): boolean;
  clearGameResult(): void;
  getGameResult(): GameResult | undefined;
  setGameResult(value?: GameResult): void;

  getPayloadCase(): Response.PayloadCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Response.AsObject;
  static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Response;
  static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
  export type AsObject = {
    type: Response.TypeMap[keyof Response.TypeMap],
    broadcast: boolean,
    destinationId: string,
    newPlayerJoined?: NewPlayerJoined.AsObject,
    problem?: Problem.AsObject,
    answerResult?: AnswerResult.AsObject,
    gameResult?: GameResult.AsObject,
  }

  export interface TypeMap {
    NEW_PLAYER_JOINED: 0;
    GAME_STARTED: 1;
    PROBLEM: 2;
    ANSWER_RESULT: 3;
    GAME_RESULT: 4;
  }

  export const Type: TypeMap;

  export enum PayloadCase {
    PAYLOAD_NOT_SET = 0,
    NEW_PLAYER_JOINED = 10,
    PROBLEM = 11,
    ANSWER_RESULT = 12,
    GAME_RESULT = 14,
  }
}

export class NewPlayerJoined extends jspb.Message {
  getPlayerId(): string;
  setPlayerId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewPlayerJoined.AsObject;
  static toObject(includeInstance: boolean, msg: NewPlayerJoined): NewPlayerJoined.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NewPlayerJoined, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewPlayerJoined;
  static deserializeBinaryFromReader(message: NewPlayerJoined, reader: jspb.BinaryReader): NewPlayerJoined;
}

export namespace NewPlayerJoined {
  export type AsObject = {
    playerId: string,
  }
}

export class Problem extends jspb.Message {
  getType(): Problem.TypeMap[keyof Problem.TypeMap];
  setType(value: Problem.TypeMap[keyof Problem.TypeMap]): void;

  getNumber(): number;
  setNumber(value: number): void;

  hasAddition(): boolean;
  clearAddition(): void;
  getAddition(): Addition | undefined;
  setAddition(value?: Addition): void;

  getPayloadCase(): Problem.PayloadCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Problem.AsObject;
  static toObject(includeInstance: boolean, msg: Problem): Problem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Problem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Problem;
  static deserializeBinaryFromReader(message: Problem, reader: jspb.BinaryReader): Problem;
}

export namespace Problem {
  export type AsObject = {
    type: Problem.TypeMap[keyof Problem.TypeMap],
    number: number,
    addition?: Addition.AsObject,
  }

  export interface TypeMap {
    ADDITION: 0;
    SUBTRACTION: 1;
    MULTIPLICATION: 2;
  }

  export const Type: TypeMap;

  export enum PayloadCase {
    PAYLOAD_NOT_SET = 0,
    ADDITION = 10,
  }
}

export class Addition extends jspb.Message {
  getX(): number;
  setX(value: number): void;

  getY(): number;
  setY(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Addition.AsObject;
  static toObject(includeInstance: boolean, msg: Addition): Addition.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Addition, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Addition;
  static deserializeBinaryFromReader(message: Addition, reader: jspb.BinaryReader): Addition;
}

export namespace Addition {
  export type AsObject = {
    x: number,
    y: number,
  }
}

export class AnswerResult extends jspb.Message {
  getPlayerId(): string;
  setPlayerId(value: string): void;

  getCorrect(): boolean;
  setCorrect(value: boolean): void;

  getScore(): number;
  setScore(value: number): void;

  clearPlayerScoresList(): void;
  getPlayerScoresList(): Array<PlayerScore>;
  setPlayerScoresList(value: Array<PlayerScore>): void;
  addPlayerScores(value?: PlayerScore, index?: number): PlayerScore;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AnswerResult.AsObject;
  static toObject(includeInstance: boolean, msg: AnswerResult): AnswerResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AnswerResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AnswerResult;
  static deserializeBinaryFromReader(message: AnswerResult, reader: jspb.BinaryReader): AnswerResult;
}

export namespace AnswerResult {
  export type AsObject = {
    playerId: string,
    correct: boolean,
    score: number,
    playerScoresList: Array<PlayerScore.AsObject>,
  }
}

export class PlayerScore extends jspb.Message {
  getPlayerId(): string;
  setPlayerId(value: string): void;

  getScore(): number;
  setScore(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerScore.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerScore): PlayerScore.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PlayerScore, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerScore;
  static deserializeBinaryFromReader(message: PlayerScore, reader: jspb.BinaryReader): PlayerScore;
}

export namespace PlayerScore {
  export type AsObject = {
    playerId: string,
    score: number,
  }
}

export class GameResult extends jspb.Message {
  getWinner(): string;
  setWinner(value: string): void;

  clearPlayerScoresList(): void;
  getPlayerScoresList(): Array<PlayerScore>;
  setPlayerScoresList(value: Array<PlayerScore>): void;
  addPlayerScores(value?: PlayerScore, index?: number): PlayerScore;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GameResult.AsObject;
  static toObject(includeInstance: boolean, msg: GameResult): GameResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GameResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GameResult;
  static deserializeBinaryFromReader(message: GameResult, reader: jspb.BinaryReader): GameResult;
}

export namespace GameResult {
  export type AsObject = {
    winner: string,
    playerScoresList: Array<PlayerScore.AsObject>,
  }
}

