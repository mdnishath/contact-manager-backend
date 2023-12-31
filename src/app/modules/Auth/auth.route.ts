import express from 'express';
import { AuthControllers } from './auth.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createUserValidationSchema } from '../User/user.validation';
import {
  changePasswordValidationSchema,
  loginValidationSchema,
  refreshValidationSchema,
} from './auth.validation';
import { auth } from '../../../middlewares/auth';

const router = express.Router();

router.post('/register', validateRequest(createUserValidationSchema), AuthControllers.register);
router.post('/login', validateRequest(loginValidationSchema), AuthControllers.login);
router.post(
  '/change-password',
  auth('user', 'admin'),
  validateRequest(changePasswordValidationSchema),
  AuthControllers.changePassword,
);
router.post('/refresh', validateRequest(refreshValidationSchema), AuthControllers.refreshToken);

export const AuthRoutes = router;
