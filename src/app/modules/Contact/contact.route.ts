import express from 'express';
import { ContactControllers } from './contact.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createContactValidationSchema, updateContactValidationSchema } from './contact.validation';
import { auth } from '../../../middlewares/auth';
const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(createContactValidationSchema),
  ContactControllers.createContact,
);
router.get('/', auth('user'), ContactControllers.getContacts);
router.patch(
  '/:id',
  auth('user'),
  validateRequest(updateContactValidationSchema),
  ContactControllers.updateContact,
);

export const ContactRoutes = router;
