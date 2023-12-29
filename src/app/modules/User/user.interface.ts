import { Model } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './user.constants';

//password type
export type TPassword = {
  password: string;
  timestamp: Date;
};
export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = keyof typeof USER_STATUS;
// user type
export type TUser = {
  name: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  passwordHistory: TPassword[];
  photo?: string;
  role: TUserRole;
  userStatus: TUserStatus;
};
export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  // isUserExistsByCustomId(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
