import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../app/utils/catchAsync';
import { TUserRole } from '../app/modules/User/user.interface';
import AppError from '../app/errors/AppError';
import httpStatus from 'http-status';

import { JWT_ACCESS_SECRET } from '../app/config';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../app/modules/User/user.model';
import { verifyToken } from '../app/utils/verifyToken';

export const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    const decoded = await verifyToken(token, JWT_ACCESS_SECRET);
    // console.log(decoded);

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

    if (roles && !roles.includes(user.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};
