// import { NextFunction, Request, Response } from 'express';
// import { ZodSchema } from 'zod';
// import { catchAsync } from '../app/utils/catchAsync';

// export const validateRequest = (schema: ZodSchema) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const bodyResult = await schema.safeParseAsync(req.body);
//     if (!bodyResult.success) {
//       next(bodyResult.error);
//     } else {
//       req.body = bodyResult.data;
//       next();
//     }
//     const cookieResult = await schema.safeParseAsync(req.cookies);
//     if (!cookieResult.success) {
//       next(cookieResult.error);
//     } else {
//       req.cookies = cookieResult.data;
//       next();
//     }
//     next();
//   });
// };

import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { catchAsync } from '../app/utils/catchAsync';

export const validateRequest = (schema: ZodSchema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let bodyResult;
    let cookieResult;
    // const cookieResult = await schema.safeParseAsync(req.cookies);
    if (Object.keys(req.body).length > 0) {
      bodyResult = await schema.safeParseAsync(req.body);
    }
    if (Object.keys(req.body).length > 0) {
      cookieResult = await schema.safeParseAsync(req.cookies);
    }
    if (bodyResult && cookieResult) {
      if (!bodyResult.success && !cookieResult.success) {
        return next(bodyResult.error && cookieResult.error);
      }
    }
    if (bodyResult && !cookieResult) {
      if (!bodyResult.success) {
        return next(bodyResult.error);
      }
    }
    if (cookieResult && !bodyResult) {
      if (!cookieResult.success) {
        return next(cookieResult.error);
      }
    }

    next();
  });
};
