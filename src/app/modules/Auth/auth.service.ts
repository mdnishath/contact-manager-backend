import { Hashly } from '../../utils/Hashed';
import { User } from '../User/user.model';
import { TRegister } from './auth.constants';

import { TUser } from '../User/user.interface';
import { TLogin } from './auth.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { PASSWORD_SALT } from '../../config';

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
  console.log(payload.password, user.password, PASSWORD_SALT.toString());

  const isPasswordMatched = await Hashly.verifyPassword(
    payload.password,
    user.password,
    PASSWORD_SALT.toString(),
  );
  console.log(isPasswordMatched);
  return 'You are now authenticated';
};

export const AuthServices = {
  register,
  login,
};
