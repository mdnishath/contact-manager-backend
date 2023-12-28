import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/sendSuccessResponse';
import { AuthServices } from './auth.service';

// register controller
const register = catchAsync(async (req, res) => {
  const payload = await req.body;
  //call auth service
  const user = await AuthServices.register(payload);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: user,
  });
});

export const AuthControllers = {
  register,
};
