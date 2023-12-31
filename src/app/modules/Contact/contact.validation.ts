import { z } from 'zod';

export const nameSchema = z.object({
  firstName: z.string().trim().min(1).max(255),
  lastName: z.string().trim().min(1).max(255),
});

export const createContactValidationSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: z.string().email(),
    phone: z.string().trim().min(1).max(15),
    country: z.string().trim().min(1).max(30),
  }),
});
