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
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    profilePicture: {
      type: String,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
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
      index: true,
    },
    gender: {
      type: String,
    },
    lastSeen: {
      type: Date,
    },
    knownIps: [String],
    flaggedIp: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', userSchema);
