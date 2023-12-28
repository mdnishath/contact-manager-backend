import { z } from 'zod';
export const createTestValidationSchema = z.object({
  title: z.string().min(1),
});
