import { Schema, model } from 'mongoose';
import { TUser, TPassword, UserModel } from './user.interface';
import { USER_ROLE, USER_STATUS } from './user.constants';
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
  password: { type: String, required: true, trim: true, default: null },
  passwordChangedAt: { type: Date, trim: true, select: 0 },
  passwordHistory: [passwordSchema],
  photo: { type: String, trim: true },
  role: { type: String, enum: Object.values(USER_ROLE), default: 'user', required: true },
  userStatus: { type: String, enum: Object.values(USER_STATUS), default: 'active', required: true },
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.passwordHistory;
    return ret;
  },
});

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};
export const User = model<TUser, UserModel>('User', userSchema);
