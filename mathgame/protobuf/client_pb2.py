# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: mathgame/protobuf/client.proto

from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='mathgame/protobuf/client.proto',
  package='mathgame.protobuf',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=b'\n\x1emathgame/protobuf/client.proto\x12\x11mathgame.protobuf\"\xea\x01\n\x07\x43ommand\x12-\n\x04type\x18\x01 \x01(\x0e\x32\x1f.mathgame.protobuf.Command.Type\x12\x11\n\tplayer_id\x18\x02 \x01(\t\x12\x32\n\nstart_game\x18\n \x01(\x0b\x32\x1c.mathgame.protobuf.StartGameH\x00\x12+\n\x06\x61nswer\x18\x0b \x01(\x0b\x32\x19.mathgame.protobuf.AnswerH\x00\"1\n\x04Type\x12\r\n\tJOIN_ROOM\x10\x00\x12\x0e\n\nSTART_GAME\x10\x01\x12\n\n\x06\x41NSWER\x10\x02\x42\t\n\x07payload\"h\n\tStartGame\x12/\n\x04type\x18\x01 \x01(\x0e\x32!.mathgame.protobuf.StartGame.Type\x12\x14\n\x0cnum_problems\x18\x02 \x01(\x05\"\x14\n\x04Type\x12\x0c\n\x08\x41\x44\x44ITION\x10\x00\"\x18\n\x06\x41nswer\x12\x0e\n\x06\x61nswer\x18\x01 \x01(\x05\x62\x06proto3'
)



_COMMAND_TYPE = _descriptor.EnumDescriptor(
  name='Type',
  full_name='mathgame.protobuf.Command.Type',
  filename=None,
  file=DESCRIPTOR,
  values=[
    _descriptor.EnumValueDescriptor(
      name='JOIN_ROOM', index=0, number=0,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='START_GAME', index=1, number=1,
      serialized_options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='ANSWER', index=2, number=2,
      serialized_options=None,
      type=None),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=228,
  serialized_end=277,
)
_sym_db.RegisterEnumDescriptor(_COMMAND_TYPE)

_STARTGAME_TYPE = _descriptor.EnumDescriptor(
  name='Type',
  full_name='mathgame.protobuf.StartGame.Type',
  filename=None,
  file=DESCRIPTOR,
  values=[
    _descriptor.EnumValueDescriptor(
      name='ADDITION', index=0, number=0,
      serialized_options=None,
      type=None),
  ],
  containing_type=None,
  serialized_options=None,
  serialized_start=374,
  serialized_end=394,
)
_sym_db.RegisterEnumDescriptor(_STARTGAME_TYPE)


_COMMAND = _descriptor.Descriptor(
  name='Command',
  full_name='mathgame.protobuf.Command',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='type', full_name='mathgame.protobuf.Command.type', index=0,
      number=1, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='player_id', full_name='mathgame.protobuf.Command.player_id', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='start_game', full_name='mathgame.protobuf.Command.start_game', index=2,
      number=10, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='answer', full_name='mathgame.protobuf.Command.answer', index=3,
      number=11, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
    _COMMAND_TYPE,
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
    _descriptor.OneofDescriptor(
      name='payload', full_name='mathgame.protobuf.Command.payload',
      index=0, containing_type=None, fields=[]),
  ],
  serialized_start=54,
  serialized_end=288,
)


_STARTGAME = _descriptor.Descriptor(
  name='StartGame',
  full_name='mathgame.protobuf.StartGame',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='type', full_name='mathgame.protobuf.StartGame.type', index=0,
      number=1, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='num_problems', full_name='mathgame.protobuf.StartGame.num_problems', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
    _STARTGAME_TYPE,
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=290,
  serialized_end=394,
)


_ANSWER = _descriptor.Descriptor(
  name='Answer',
  full_name='mathgame.protobuf.Answer',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='answer', full_name='mathgame.protobuf.Answer.answer', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=396,
  serialized_end=420,
)

_COMMAND.fields_by_name['type'].enum_type = _COMMAND_TYPE
_COMMAND.fields_by_name['start_game'].message_type = _STARTGAME
_COMMAND.fields_by_name['answer'].message_type = _ANSWER
_COMMAND_TYPE.containing_type = _COMMAND
_COMMAND.oneofs_by_name['payload'].fields.append(
  _COMMAND.fields_by_name['start_game'])
_COMMAND.fields_by_name['start_game'].containing_oneof = _COMMAND.oneofs_by_name['payload']
_COMMAND.oneofs_by_name['payload'].fields.append(
  _COMMAND.fields_by_name['answer'])
_COMMAND.fields_by_name['answer'].containing_oneof = _COMMAND.oneofs_by_name['payload']
_STARTGAME.fields_by_name['type'].enum_type = _STARTGAME_TYPE
_STARTGAME_TYPE.containing_type = _STARTGAME
DESCRIPTOR.message_types_by_name['Command'] = _COMMAND
DESCRIPTOR.message_types_by_name['StartGame'] = _STARTGAME
DESCRIPTOR.message_types_by_name['Answer'] = _ANSWER
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Command = _reflection.GeneratedProtocolMessageType('Command', (_message.Message,), {
  'DESCRIPTOR' : _COMMAND,
  '__module__' : 'mathgame.protobuf.client_pb2'
  # @@protoc_insertion_point(class_scope:mathgame.protobuf.Command)
  })
_sym_db.RegisterMessage(Command)

StartGame = _reflection.GeneratedProtocolMessageType('StartGame', (_message.Message,), {
  'DESCRIPTOR' : _STARTGAME,
  '__module__' : 'mathgame.protobuf.client_pb2'
  # @@protoc_insertion_point(class_scope:mathgame.protobuf.StartGame)
  })
_sym_db.RegisterMessage(StartGame)

Answer = _reflection.GeneratedProtocolMessageType('Answer', (_message.Message,), {
  'DESCRIPTOR' : _ANSWER,
  '__module__' : 'mathgame.protobuf.client_pb2'
  # @@protoc_insertion_point(class_scope:mathgame.protobuf.Answer)
  })
_sym_db.RegisterMessage(Answer)


# @@protoc_insertion_point(module_scope)
