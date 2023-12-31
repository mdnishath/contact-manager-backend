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
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};
