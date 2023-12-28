import { User } from '../User/user.model';
import { TRegister } from './auth.constants';

// register user
const register = async (payload: TRegister): Promise<TRegister | null> => {
  const user = await User.create({ ...payload, role: 'user' });
  return user;
};

export const AuthServices = {
  register,
};
