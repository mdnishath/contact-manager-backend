import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/sendSuccessResponse';
import { UserServices } from './user.service';

const getUsers = catchAsync(async (req, res) => {
  //call user service
  // console.log(req.cookies?.refreshToken);

  const users = await UserServices.getUsers();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: users,
  });
});

export const UserControllers = {
  getUsers,
};
