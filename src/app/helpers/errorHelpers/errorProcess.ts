import { ZodError } from 'zod';
import { TErrorResponse } from '../../interface/TErrorResponse';
import { handleZodError } from './handleZodError';
import mongoose from 'mongoose';
import { handleValidationError } from './handleValidationError';
import handlerDuplicateError from './handleDuplicateError';
import handlerCastError from './handleCastError';
import AppError from '../../errors/AppError';
import { handlerAppError } from './handleAppError';

export const errorProcess = (error: any): TErrorResponse => {
  if (error instanceof ZodError) {
    return handleZodError(error);
  } else if (error instanceof mongoose.Error.ValidationError) {
    return handleValidationError(error);
  } else if (error.code && error.code === 11000) {
    return handlerDuplicateError(error);
  } else if (error instanceof mongoose.Error.CastError) {
    return handlerCastError(error);
  } else if (error instanceof AppError) {
    return handlerAppError(error);
  } else {
    return {
      statusCode: 500,
      status: 'error',
      message: 'Unknown Error',
      issues: [
        {
          path: '',
          message: error.message,
        },
      ],
    };
  }
};
