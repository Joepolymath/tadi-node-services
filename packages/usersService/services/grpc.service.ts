import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import {
  LoginRequest,
  LoginResponse,
  UnimplementedUserServiceService,
  UserRegistrationRequest,
  UserRegistrationResponse,
  UserServiceClient,
} from '../../grpc/users';
import { VerifyAuthRequest, VerifyAuthResponse } from '../../grpc/users';

class UserServiceImpl extends UnimplementedUserServiceService {
  RegisterUser(
    call: ServerUnaryCall<UserRegistrationRequest, UserRegistrationResponse>,
    callback: sendUnaryData<UserRegistrationResponse>
  ): void {
    throw new Error('Method not implemented.');
  }

  Login(
    call: ServerUnaryCall<LoginRequest, LoginResponse>,
    callback: sendUnaryData<LoginResponse>
  ): void {
    throw new Error('Method not implemented.');
  }

  VerifyAuth(
    call: ServerUnaryCall<VerifyAuthRequest, VerifyAuthResponse>,
    callback: sendUnaryData<VerifyAuthResponse>
  ): void {
    throw new Error('Method not implemented.');
  }
}
