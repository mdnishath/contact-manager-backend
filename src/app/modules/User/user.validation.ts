import { z } from 'zod';
import { USER_ROLE, USER_STATUS } from './user.constants';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(255),
    email: z.string().email().max(255),
    password: z.string().min(6).max(255),
    photo: z.string().max(255),
    role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]).default(USER_ROLE.user),
    userStatus: z.enum(Object.values(USER_STATUS) as [string, ...string[]]).default('active'),
  }),
});
export const registerUserValidationSchema = createUserValidationSchema.extend({
  body: z.object({
    role: z.enum([USER_ROLE.user]).default('user'),
  }),
});
