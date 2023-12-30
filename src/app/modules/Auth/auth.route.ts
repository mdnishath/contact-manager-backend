import express from 'express';
import { AuthControllers } from './auth.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createUserValidationSchema } from '../User/user.validation';
import { loginValidationSchema, refreshValidationSchema } from './auth.validation';

const router = express.Router();

router.post('/register', validateRequest(createUserValidationSchema), AuthControllers.register);
router.post('/login', validateRequest(loginValidationSchema), AuthControllers.login);
router.post('/refresh', validateRequest(refreshValidationSchema), AuthControllers.refreshToken);

export const AuthRoutes = router;
