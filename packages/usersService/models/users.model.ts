import mongoose from 'mongoose';
import { IUser, Role } from '../types/user.types';

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    title: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    password: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    address: {
      type: String,
    },
    nationality: {
      type: String,
    },
    username: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', userSchema);
