import express from 'express';
import { AuthControllers } from './auth.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createUserValidationSchema, registerUserValidationSchema } from '../User/user.validation';
import {
  changePasswordValidationSchema,
  loginValidationSchema,
  refreshValidationSchema,
} from './auth.validation';
import { auth } from '../../../middlewares/auth';

const router = express.Router();

router.post('/register', validateRequest(registerUserValidationSchema), AuthControllers.register);
router.post('/login', validateRequest(loginValidationSchema), AuthControllers.login);
router.post(
  '/change-password',
  auth('user', 'admin'),
  validateRequest(changePasswordValidationSchema),
  AuthControllers.changePassword,
);
router.post(
  '/create-user',
  validateRequest(createUserValidationSchema),
  AuthControllers.createUser,
);
router.post('/refresh', validateRequest(refreshValidationSchema), AuthControllers.refreshToken);

export const AuthRoutes = router;
