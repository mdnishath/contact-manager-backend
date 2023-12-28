import { TUser } from '../User/user.interface';

export interface TRegister extends Omit<TUser, 'passwordChangedAt' | 'role' | 'userStatus'> {}
