import { Date, Document } from 'mongoose';

export interface IUser extends Document {
  _id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  password?: string;
  dateOfBirth?: Date | string;
  address?: string;
  role?: string;
  nationality?: string;
  username?: string;
  gender?: string;
  profilePicture?: string;
  knownIps?: string[];
  flaggedIp: string;
  lastSeen?: Date;
}
export interface IGetUsers {
  _id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  role?: string;
  nationality?: string;
  username?: string;
  gender?: string;
  skip?: number;
  limit?: number;
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface ILogin {
  email?: string;
  phone?: string;
  password: string;
  ip?: string;
}
