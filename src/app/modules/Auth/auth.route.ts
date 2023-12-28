import express from 'express';
import { AuthControllers } from './auth.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createUserValidationSchema } from '../User/user.validation';

const router = express.Router();

router.post('/register', validateRequest(createUserValidationSchema), AuthControllers.register);

export const AuthRoutes = router;
