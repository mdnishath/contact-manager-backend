/* eslint-disable @typescript-eslint/no-unused-vars */
import { NODE_ENV } from '../app/config';
import { Request, Response, NextFunction } from 'express';
import { TErrorResponse } from '../app/interface/TErrorResponse';
import { errorProcess } from '../app/helpers/errorHelpers/errorProcess';

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  let errorResponse: TErrorResponse = {
    statusCode: error.statusCode || 500,
    status: error.status || 'error',
    message: error.message || 'Something went wrong',
    issues: error.issues || [],
  };

  errorResponse = errorProcess(error);
  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    message: errorResponse.message,
    issues: errorResponse.issues,
    // Only include stack trace in NODE_ENV=development
    stack: NODE_ENV === 'development' ? error.stack : undefined,
    error: error,
  });
};

export default globalErrorHandler;
