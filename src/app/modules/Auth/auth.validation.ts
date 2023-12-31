import z from 'zod';

export const loginValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const refreshValidationSchema = z.object({
  refreshToken: z.string({
    required_error: 'Refresh token is required!',
  }),
});

export const changePasswordValidationSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6),
});
