import { TUser } from '../User/user.interface';

export type TSecureUser = Omit<TUser, 'password' | 'passwordHistory' | 'passwordChangedAt'>;
export type TLogin = {
  email: string;
  password: string;
};
