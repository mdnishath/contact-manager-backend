import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { catchAsync } from '../app/utils/catchAsync';

export const validateRequest = (schema: ZodSchema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
      next(result.error);
    } else {
      req.body = result.data;
      next();
    }
  });
};
