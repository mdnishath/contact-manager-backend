import AppError from '../../errors/AppError';
import { TErrorIssue, TErrorResponse } from '../../interface/TErrorResponse';

export const handlerAppError = (err: AppError): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: '',
      message: err.message,
    },
  ];

  return {
    statusCode: err.statusCode,
    status: 'error',
    message: 'App Error',
    issues,
  };
};
