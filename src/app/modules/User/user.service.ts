import { TUser } from './user.interface';
import { User } from './user.model';

const getUsers = async (): Promise<TUser[] | null> => {
  const result = await User.find({});
  return result;
};

export const UserServices = {
  getUsers,
};
