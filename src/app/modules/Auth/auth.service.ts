import { Hashly } from '../../utils/Hashed';
import { User } from '../User/user.model';
import { TRegister } from './auth.constants';

import { TUser } from '../User/user.interface';
import { TLogin } from './auth.interface';
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
  const hashedPassword = await Hashly.hashPassword(
    payload.password as string,
    PASSWORD_SALT.toString(),
  );
  payload.password = hashedPassword;
  const user = await User.create({ ...payload, role: 'user' });

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
  login,
  refreshToken,
};
