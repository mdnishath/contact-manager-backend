import { Hashly } from '../../utils/Hashed';
import { User } from '../User/user.model';
import { TRegister } from './auth.constants';

import { TUser } from '../User/user.interface';
import { TLogin } from './auth.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { JWT_ACCESS_SECRET, JWT_ACCESS_SECRET_EXPAIR_IN, PASSWORD_SALT } from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { createToken } from '../../utils/createTocken';

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
const login = async (payload: TLogin): Promise<string> => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }
  if (!user.password) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }
  // console.log(payload.password, user.password, PASSWORD_SALT.toString());

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
  return accessToken;
};

export const AuthServices = {
  register,
  login,
};
