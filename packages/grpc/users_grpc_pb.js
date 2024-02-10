// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var users_pb = require('./users_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_LoginRequest(arg) {
  if (!(arg instanceof users_pb.LoginRequest)) {
    throw new Error('Expected argument of type LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LoginRequest(buffer_arg) {
  return users_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_LoginResponse(arg) {
  if (!(arg instanceof users_pb.LoginResponse)) {
    throw new Error('Expected argument of type LoginResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LoginResponse(buffer_arg) {
  return users_pb.LoginResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UserRegistrationRequest(arg) {
  if (!(arg instanceof users_pb.UserRegistrationRequest)) {
    throw new Error('Expected argument of type UserRegistrationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UserRegistrationRequest(buffer_arg) {
  return users_pb.UserRegistrationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UserRegistrationResponse(arg) {
  if (!(arg instanceof users_pb.UserRegistrationResponse)) {
    throw new Error('Expected argument of type UserRegistrationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UserRegistrationResponse(buffer_arg) {
  return users_pb.UserRegistrationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_VerifyAuthRequest(arg) {
  if (!(arg instanceof users_pb.VerifyAuthRequest)) {
    throw new Error('Expected argument of type VerifyAuthRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_VerifyAuthRequest(buffer_arg) {
  return users_pb.VerifyAuthRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_VerifyAuthResponse(arg) {
  if (!(arg instanceof users_pb.VerifyAuthResponse)) {
    throw new Error('Expected argument of type VerifyAuthResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_VerifyAuthResponse(buffer_arg) {
  return users_pb.VerifyAuthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  registerUser: {
    path: '/UserService/RegisterUser',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.UserRegistrationRequest,
    responseType: users_pb.UserRegistrationResponse,
    requestSerialize: serialize_UserRegistrationRequest,
    requestDeserialize: deserialize_UserRegistrationRequest,
    responseSerialize: serialize_UserRegistrationResponse,
    responseDeserialize: deserialize_UserRegistrationResponse,
  },
  login: {
    path: '/UserService/Login',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.LoginRequest,
    responseType: users_pb.LoginResponse,
    requestSerialize: serialize_LoginRequest,
    requestDeserialize: deserialize_LoginRequest,
    responseSerialize: serialize_LoginResponse,
    responseDeserialize: deserialize_LoginResponse,
  },
  verifyAuth: {
    path: '/UserService/VerifyAuth',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.VerifyAuthRequest,
    responseType: users_pb.VerifyAuthResponse,
    requestSerialize: serialize_VerifyAuthRequest,
    requestDeserialize: deserialize_VerifyAuthRequest,
    responseSerialize: serialize_VerifyAuthResponse,
    responseDeserialize: deserialize_VerifyAuthResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
