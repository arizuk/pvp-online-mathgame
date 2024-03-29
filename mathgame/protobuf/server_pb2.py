# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: mathgame/protobuf/server.proto

from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database

# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


DESCRIPTOR = _descriptor.FileDescriptor(
    name="mathgame/protobuf/server.proto",
    package="mathgame.protobuf",
    syntax="proto3",
    serialized_options=None,
    serialized_pb=b'\n\x1emathgame/protobuf/server.proto\x12\x11mathgame.protobuf"\xb2\x03\n\x08Response\x12.\n\x04type\x18\x01 \x01(\x0e\x32 .mathgame.protobuf.Response.Type\x12\x11\n\tbroadcast\x18\x02 \x01(\x08\x12\x16\n\x0e\x64\x65stination_id\x18\x03 \x01(\t\x12?\n\x11new_player_joined\x18\n \x01(\x0b\x32".mathgame.protobuf.NewPlayerJoinedH\x00\x12-\n\x07problem\x18\x0b \x01(\x0b\x32\x1a.mathgame.protobuf.ProblemH\x00\x12\x38\n\ranswer_result\x18\x0c \x01(\x0b\x32\x1f.mathgame.protobuf.AnswerResultH\x00\x12\x34\n\x0bgame_result\x18\x0e \x01(\x0b\x32\x1d.mathgame.protobuf.GameResultH\x00"`\n\x04Type\x12\x15\n\x11NEW_PLAYER_JOINED\x10\x00\x12\x10\n\x0cGAME_STARTED\x10\x01\x12\x0b\n\x07PROBLEM\x10\x02\x12\x11\n\rANSWER_RESULT\x10\x03\x12\x0f\n\x0bGAME_RESULT\x10\x04\x42\t\n\x07payload"$\n\x0fNewPlayerJoined\x12\x11\n\tplayer_id\x18\x01 \x01(\t"\xbb\x01\n\x07Problem\x12-\n\x04type\x18\x01 \x01(\x0e\x32\x1f.mathgame.protobuf.Problem.Type\x12\x0e\n\x06number\x18\x02 \x01(\x05\x12+\n\x06\x62inary\x18\n \x01(\x0b\x32\x19.mathgame.protobuf.BinaryH\x00"9\n\x04Type\x12\x0c\n\x08\x41\x44\x44ITION\x10\x00\x12\x0f\n\x0bSUBTRACTION\x10\x01\x12\x12\n\x0eMULTIPLICATION\x10\x02\x42\t\n\x07payload"\x1e\n\x06\x42inary\x12\t\n\x01x\x18\x01 \x01(\x05\x12\t\n\x01y\x18\x02 \x01(\x05"x\n\x0c\x41nswerResult\x12\x11\n\tplayer_id\x18\x01 \x01(\t\x12\x0f\n\x07\x63orrect\x18\x02 \x01(\x08\x12\r\n\x05score\x18\x03 \x01(\x05\x12\x35\n\rplayer_scores\x18\x04 \x03(\x0b\x32\x1e.mathgame.protobuf.PlayerScore"/\n\x0bPlayerScore\x12\x11\n\tplayer_id\x18\x01 \x01(\t\x12\r\n\x05score\x18\x02 \x01(\x05"S\n\nGameResult\x12\x0e\n\x06winner\x18\x01 \x01(\t\x12\x35\n\rplayer_scores\x18\x04 \x03(\x0b\x32\x1e.mathgame.protobuf.PlayerScoreb\x06proto3',
)


_RESPONSE_TYPE = _descriptor.EnumDescriptor(
    name="Type",
    full_name="mathgame.protobuf.Response.Type",
    filename=None,
    file=DESCRIPTOR,
    values=[
        _descriptor.EnumValueDescriptor(
            name="NEW_PLAYER_JOINED",
            index=0,
            number=0,
            serialized_options=None,
            type=None,
        ),
        _descriptor.EnumValueDescriptor(
            name="GAME_STARTED", index=1, number=1, serialized_options=None, type=None
        ),
        _descriptor.EnumValueDescriptor(
            name="PROBLEM", index=2, number=2, serialized_options=None, type=None
        ),
        _descriptor.EnumValueDescriptor(
            name="ANSWER_RESULT", index=3, number=3, serialized_options=None, type=None
        ),
        _descriptor.EnumValueDescriptor(
            name="GAME_RESULT", index=4, number=4, serialized_options=None, type=None
        ),
    ],
    containing_type=None,
    serialized_options=None,
    serialized_start=381,
    serialized_end=477,
)
_sym_db.RegisterEnumDescriptor(_RESPONSE_TYPE)

_PROBLEM_TYPE = _descriptor.EnumDescriptor(
    name="Type",
    full_name="mathgame.protobuf.Problem.Type",
    filename=None,
    file=DESCRIPTOR,
    values=[
        _descriptor.EnumValueDescriptor(
            name="ADDITION", index=0, number=0, serialized_options=None, type=None
        ),
        _descriptor.EnumValueDescriptor(
            name="SUBTRACTION", index=1, number=1, serialized_options=None, type=None
        ),
        _descriptor.EnumValueDescriptor(
            name="MULTIPLICATION", index=2, number=2, serialized_options=None, type=None
        ),
    ],
    containing_type=None,
    serialized_options=None,
    serialized_start=648,
    serialized_end=705,
)
_sym_db.RegisterEnumDescriptor(_PROBLEM_TYPE)


_RESPONSE = _descriptor.Descriptor(
    name="Response",
    full_name="mathgame.protobuf.Response",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
        _descriptor.FieldDescriptor(
            name="type",
            full_name="mathgame.protobuf.Response.type",
            index=0,
            number=1,
            type=14,
            cpp_type=8,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="broadcast",
            full_name="mathgame.protobuf.Response.broadcast",
            index=1,
            number=2,
            type=8,
            cpp_type=7,
            label=1,
            has_default_value=False,
            default_value=False,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="destination_id",
            full_name="mathgame.protobuf.Response.destination_id",
            index=2,
            number=3,
            type=9,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"".decode("utf-8"),
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="new_player_joined",
            full_name="mathgame.protobuf.Response.new_player_joined",
            index=3,
            number=10,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="problem",
            full_name="mathgame.protobuf.Response.problem",
            index=4,
            number=11,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="answer_result",
            full_name="mathgame.protobuf.Response.answer_result",
            index=5,
            number=12,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="game_result",
            full_name="mathgame.protobuf.Response.game_result",
            index=6,
            number=14,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[_RESPONSE_TYPE,],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[
        _descriptor.OneofDescriptor(
            name="payload",
            full_name="mathgame.protobuf.Response.payload",
            index=0,
            containing_type=None,
            fields=[],
        ),
    ],
    serialized_start=54,
    serialized_end=488,
)


_NEWPLAYERJOINED = _descriptor.Descriptor(
    name="NewPlayerJoined",
    full_name="mathgame.protobuf.NewPlayerJoined",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
        _descriptor.FieldDescriptor(
            name="player_id",
            full_name="mathgame.protobuf.NewPlayerJoined.player_id",
            index=0,
            number=1,
            type=9,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"".decode("utf-8"),
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=490,
    serialized_end=526,
)


_PROBLEM = _descriptor.Descriptor(
    name="Problem",
    full_name="mathgame.protobuf.Problem",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
        _descriptor.FieldDescriptor(
            name="type",
            full_name="mathgame.protobuf.Problem.type",
            index=0,
            number=1,
            type=14,
            cpp_type=8,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="number",
            full_name="mathgame.protobuf.Problem.number",
            index=1,
            number=2,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="binary",
            full_name="mathgame.protobuf.Problem.binary",
            index=2,
            number=10,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[_PROBLEM_TYPE,],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[
        _descriptor.OneofDescriptor(
            name="payload",
            full_name="mathgame.protobuf.Problem.payload",
            index=0,
            containing_type=None,
            fields=[],
        ),
    ],
    serialized_start=529,
    serialized_end=716,
)


_BINARY = _descriptor.Descriptor(
    name="Binary",
    full_name="mathgame.protobuf.Binary",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
        _descriptor.FieldDescriptor(
            name="x",
            full_name="mathgame.protobuf.Binary.x",
            index=0,
            number=1,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="y",
            full_name="mathgame.protobuf.Binary.y",
            index=1,
            number=2,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=718,
    serialized_end=748,
)


_ANSWERRESULT = _descriptor.Descriptor(
    name="AnswerResult",
    full_name="mathgame.protobuf.AnswerResult",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
        _descriptor.FieldDescriptor(
            name="player_id",
            full_name="mathgame.protobuf.AnswerResult.player_id",
            index=0,
            number=1,
            type=9,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"".decode("utf-8"),
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="correct",
            full_name="mathgame.protobuf.AnswerResult.correct",
            index=1,
            number=2,
            type=8,
            cpp_type=7,
            label=1,
            has_default_value=False,
            default_value=False,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="score",
            full_name="mathgame.protobuf.AnswerResult.score",
            index=2,
            number=3,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="player_scores",
            full_name="mathgame.protobuf.AnswerResult.player_scores",
            index=3,
            number=4,
            type=11,
            cpp_type=10,
            label=3,
            has_default_value=False,
            default_value=[],
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=750,
    serialized_end=870,
)


_PLAYERSCORE = _descriptor.Descriptor(
    name="PlayerScore",
    full_name="mathgame.protobuf.PlayerScore",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
        _descriptor.FieldDescriptor(
            name="player_id",
            full_name="mathgame.protobuf.PlayerScore.player_id",
            index=0,
            number=1,
            type=9,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"".decode("utf-8"),
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="score",
            full_name="mathgame.protobuf.PlayerScore.score",
            index=1,
            number=2,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=872,
    serialized_end=919,
)


_GAMERESULT = _descriptor.Descriptor(
    name="GameResult",
    full_name="mathgame.protobuf.GameResult",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
        _descriptor.FieldDescriptor(
            name="winner",
            full_name="mathgame.protobuf.GameResult.winner",
            index=0,
            number=1,
            type=9,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"".decode("utf-8"),
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="player_scores",
            full_name="mathgame.protobuf.GameResult.player_scores",
            index=1,
            number=4,
            type=11,
            cpp_type=10,
            label=3,
            has_default_value=False,
            default_value=[],
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=921,
    serialized_end=1004,
)

_RESPONSE.fields_by_name["type"].enum_type = _RESPONSE_TYPE
_RESPONSE.fields_by_name["new_player_joined"].message_type = _NEWPLAYERJOINED
_RESPONSE.fields_by_name["problem"].message_type = _PROBLEM
_RESPONSE.fields_by_name["answer_result"].message_type = _ANSWERRESULT
_RESPONSE.fields_by_name["game_result"].message_type = _GAMERESULT
_RESPONSE_TYPE.containing_type = _RESPONSE
_RESPONSE.oneofs_by_name["payload"].fields.append(
    _RESPONSE.fields_by_name["new_player_joined"]
)
_RESPONSE.fields_by_name[
    "new_player_joined"
].containing_oneof = _RESPONSE.oneofs_by_name["payload"]
_RESPONSE.oneofs_by_name["payload"].fields.append(_RESPONSE.fields_by_name["problem"])
_RESPONSE.fields_by_name["problem"].containing_oneof = _RESPONSE.oneofs_by_name[
    "payload"
]
_RESPONSE.oneofs_by_name["payload"].fields.append(
    _RESPONSE.fields_by_name["answer_result"]
)
_RESPONSE.fields_by_name["answer_result"].containing_oneof = _RESPONSE.oneofs_by_name[
    "payload"
]
_RESPONSE.oneofs_by_name["payload"].fields.append(
    _RESPONSE.fields_by_name["game_result"]
)
_RESPONSE.fields_by_name["game_result"].containing_oneof = _RESPONSE.oneofs_by_name[
    "payload"
]
_PROBLEM.fields_by_name["type"].enum_type = _PROBLEM_TYPE
_PROBLEM.fields_by_name["binary"].message_type = _BINARY
_PROBLEM_TYPE.containing_type = _PROBLEM
_PROBLEM.oneofs_by_name["payload"].fields.append(_PROBLEM.fields_by_name["binary"])
_PROBLEM.fields_by_name["binary"].containing_oneof = _PROBLEM.oneofs_by_name["payload"]
_ANSWERRESULT.fields_by_name["player_scores"].message_type = _PLAYERSCORE
_GAMERESULT.fields_by_name["player_scores"].message_type = _PLAYERSCORE
DESCRIPTOR.message_types_by_name["Response"] = _RESPONSE
DESCRIPTOR.message_types_by_name["NewPlayerJoined"] = _NEWPLAYERJOINED
DESCRIPTOR.message_types_by_name["Problem"] = _PROBLEM
DESCRIPTOR.message_types_by_name["Binary"] = _BINARY
DESCRIPTOR.message_types_by_name["AnswerResult"] = _ANSWERRESULT
DESCRIPTOR.message_types_by_name["PlayerScore"] = _PLAYERSCORE
DESCRIPTOR.message_types_by_name["GameResult"] = _GAMERESULT
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Response = _reflection.GeneratedProtocolMessageType(
    "Response",
    (_message.Message,),
    {
        "DESCRIPTOR": _RESPONSE,
        "__module__": "mathgame.protobuf.server_pb2"
        # @@protoc_insertion_point(class_scope:mathgame.protobuf.Response)
    },
)
_sym_db.RegisterMessage(Response)

NewPlayerJoined = _reflection.GeneratedProtocolMessageType(
    "NewPlayerJoined",
    (_message.Message,),
    {
        "DESCRIPTOR": _NEWPLAYERJOINED,
        "__module__": "mathgame.protobuf.server_pb2"
        # @@protoc_insertion_point(class_scope:mathgame.protobuf.NewPlayerJoined)
    },
)
_sym_db.RegisterMessage(NewPlayerJoined)

Problem = _reflection.GeneratedProtocolMessageType(
    "Problem",
    (_message.Message,),
    {
        "DESCRIPTOR": _PROBLEM,
        "__module__": "mathgame.protobuf.server_pb2"
        # @@protoc_insertion_point(class_scope:mathgame.protobuf.Problem)
    },
)
_sym_db.RegisterMessage(Problem)

Binary = _reflection.GeneratedProtocolMessageType(
    "Binary",
    (_message.Message,),
    {
        "DESCRIPTOR": _BINARY,
        "__module__": "mathgame.protobuf.server_pb2"
        # @@protoc_insertion_point(class_scope:mathgame.protobuf.Binary)
    },
)
_sym_db.RegisterMessage(Binary)

AnswerResult = _reflection.GeneratedProtocolMessageType(
    "AnswerResult",
    (_message.Message,),
    {
        "DESCRIPTOR": _ANSWERRESULT,
        "__module__": "mathgame.protobuf.server_pb2"
        # @@protoc_insertion_point(class_scope:mathgame.protobuf.AnswerResult)
    },
)
_sym_db.RegisterMessage(AnswerResult)

PlayerScore = _reflection.GeneratedProtocolMessageType(
    "PlayerScore",
    (_message.Message,),
    {
        "DESCRIPTOR": _PLAYERSCORE,
        "__module__": "mathgame.protobuf.server_pb2"
        # @@protoc_insertion_point(class_scope:mathgame.protobuf.PlayerScore)
    },
)
_sym_db.RegisterMessage(PlayerScore)

GameResult = _reflection.GeneratedProtocolMessageType(
    "GameResult",
    (_message.Message,),
    {
        "DESCRIPTOR": _GAMERESULT,
        "__module__": "mathgame.protobuf.server_pb2"
        # @@protoc_insertion_point(class_scope:mathgame.protobuf.GameResult)
    },
)
_sym_db.RegisterMessage(GameResult)


# @@protoc_insertion_point(module_scope)
