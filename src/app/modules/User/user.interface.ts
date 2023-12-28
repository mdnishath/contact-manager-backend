import { USER_ROLE, USER_STATUS } from './user.constants';

//password type
export type Tpassword = {
  password: string;
  timestamp: Date;
}[];
export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = keyof typeof USER_STATUS;
// user type
export type TUser = {
  name: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  passwordHistory: Tpassword;
  photo: string;
  role: TUserRole;
  userStatus: TUserStatus;
};
