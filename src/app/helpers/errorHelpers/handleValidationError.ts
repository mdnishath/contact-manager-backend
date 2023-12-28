import { TErrorIssue, TErrorResponse } from '../../interface/TErrorResponse';
import mongoose from 'mongoose';

export const handleValidationError = (error: mongoose.Error.ValidationError): TErrorResponse => {
  const errorValues = Object.values(error.errors);

  const issues: TErrorIssue[] = [];
  errorValues.forEach((errorObject) => {
    issues.push({
      path: errorObject?.path,
      message: errorObject?.message,
    });
  });
  return {
    statusCode: 400,
    status: 'error',
    message: 'Validation Error',
    issues,
  };
};
