import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/sendSuccessResponse';
import { AuthServices } from './auth.service';
import { NODE_ENV } from '../../config';

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

// login controler
const login = catchAsync(async (req, res) => {
  const payload = await req.body;
  //call auth service
  const result = await AuthServices.login(payload);
  res.cookie('refreshToken', result.refreshToken, {
    secure: NODE_ENV === 'production',
    httpOnly: true,
  });
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User login successfully',
    data: result,
  });
});

//change password
const changePassword = catchAsync(async (req, res) => {
  const userData = req.user;

  const payload = await req.body;
  // call user service
  const result = await AuthServices.changePassword(userData, payload);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Password changed successfully',
    data: result,
  });
});

//create refresh token
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User login successfully',
    data: result,
  });
});

export const AuthControllers = {
  register,
  login,
  refreshToken,
  changePassword,
};
