// package: 
// file: hello.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Join extends jspb.Message { 
    getPlayerId(): string;
    setPlayerId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Join.AsObject;
    static toObject(includeInstance: boolean, msg: Join): Join.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Join, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Join;
    static deserializeBinaryFromReader(message: Join, reader: jspb.BinaryReader): Join;
}

export namespace Join {
    export type AsObject = {
        playerId: string,
    }
}
