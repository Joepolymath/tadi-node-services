import { Document } from 'mongoose';

export interface IUser extends Document {
  _id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  dateOfBirth?: Date | string;
  address?: string;
  role?: string;
  nationality?: string;
  username?: string;
  gender?: string;
  profilePicture?: string;
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
