import { Schema, model } from 'mongoose';
import { TUser, TPassword, UserModel } from './user.interface';
import { USER_ROLE, USER_STATUS } from './user.constants';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
const passwordSchema = new Schema<TPassword>({
  password: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
export const userSchema = new Schema<TUser, UserModel>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true, select: 0 },
  passwordChangedAt: { type: Date, trim: true, select: 0, default: null },
  passwordHistory: { type: [passwordSchema], select: 0 },
  photo: { type: String, trim: true },
  role: { type: String, enum: Object.values(USER_ROLE), default: 'user', required: true },
  userStatus: { type: String, enum: Object.values(USER_STATUS), default: 'active', required: true },
});

// userSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     delete ret.password;
//     delete ret.passwordHistory;
//     return ret;
//   },
// });

userSchema.statics.isUserExists = async function (id: Schema.Types.ObjectId) {
  const isUserExists = await this.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, `User ${id} does not exist`);
  }
  return isUserExists;
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};
export const User = model<TUser, UserModel>('User', userSchema);
