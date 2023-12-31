import { Hashly } from '../../utils/Hashed';
import { User } from '../User/user.model';
import { TRegister } from './auth.constants';

import { TUser } from '../User/user.interface';
import { TChanagePassword, TLogin } from './auth.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_SECRET_EXPAIR_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_SECRET_EXPAIR_IN,
  PASSWORD_SALT,
} from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { createToken } from '../../utils/createTocken';
import { verifyToken } from '../../utils/verifyToken';

// register user
const register = async (payload: TRegister): Promise<TUser | null> => {
  console.log(payload);

  const hashedPassword = await Hashly.hashPassword(
    payload.password as string,
    PASSWORD_SALT.toString(),
  );
  payload.passwordHistory = [];
  payload.password = hashedPassword;
  payload.passwordHistory.push({ password: hashedPassword, timestamp: new Date() });
  const user = await User.create(payload);

  return user;
};
const createUser = async (payload: TRegister): Promise<TUser | null> => {
  const hashedPassword = await Hashly.hashPassword(
    payload.password as string,
    PASSWORD_SALT.toString(),
  );
  payload.passwordHistory = [];
  payload.password = hashedPassword;
  payload.passwordHistory.push({ password: hashedPassword, timestamp: new Date() });
  const user = await User.create({ ...payload, role: 'admin' });

  return user;
};

//lohin user
const login = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }
  if (!user.password) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }

  const isPasswordMatched = await Hashly.verifyPassword(
    payload.password,
    user.password,
    PASSWORD_SALT.toString(),
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid password');
  }
  const loginPayload = {
    email: user?.email,
    role: user?.role,
  } as JwtPayload;

  const accessToken = await createToken(
    loginPayload,
    JWT_ACCESS_SECRET,
    JWT_ACCESS_SECRET_EXPAIR_IN,
  );
  const refreshToken = await createToken(
    loginPayload,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_SECRET_EXPAIR_IN,
  );
  return {
    accessToken,
    refreshToken,
  };
};

// change password
const changePassword = async (
  userData: JwtPayload,
  payload: TChanagePassword,
): Promise<TUser | null> => {
  // console.log(userData);

  if (!userData) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized User');
  }
  const { email } = userData;
  const user = await User.findOne({ email }).select('+password +passwordHistory');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (!payload.oldPassword && !payload.newPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'old password and new password required');
  }
  // check if password match
  const oldPachewordMatch = await Hashly.verifyPassword(
    payload.oldPassword,
    user.password,
    PASSWORD_SALT.toString(),
  );

  if (oldPachewordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong password');
  }
  const newPachewordMatch = await Hashly.verifyPassword(
    payload.newPassword,
    user.password,
    PASSWORD_SALT.toString(),
  );
  if (newPachewordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Try another password');
  }
  const newHashedPassword = await Hashly.hashPassword(
    payload.newPassword as string,
    PASSWORD_SALT.toString(),
  );

  for (const obj of user.passwordHistory) {
    if (newHashedPassword === user.password) {
      throw new AppError(
        400,
        `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${obj.timestamp
          .toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })
          .replace(/\//g, '-')}).`,
      );
    }
  }

  user.passwordHistory.unshift({ password: newHashedPassword, timestamp: new Date() });
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      password: newHashedPassword,
      passwordHistory: user.passwordHistory,
    },
    { new: true },
  );
  return updatedUser;
};
//create refresh token
const refreshToken = async (token: string): Promise<string> => {
  const decoded = (await verifyToken(token, JWT_REFRESH_SECRET)) as JwtPayload;

  const { email, iat } = decoded;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const { userStatus } = user;
  if (userStatus === 'inactive') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is inactive  !');
  }
  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = await createToken(jwtPayload, JWT_ACCESS_SECRET, JWT_ACCESS_SECRET_EXPAIR_IN);
  return accessToken;
};

export const AuthServices = {
  register,
  createUser,
  login,
  refreshToken,
  changePassword,
};
