import express from 'express';
import { ContactControllers } from './contact.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createContactValidationSchema } from './contact.validation';
import { auth } from '../../../middlewares/auth';
const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(createContactValidationSchema),
  ContactControllers.createContact,
);

export const ContactRoutes = router;
