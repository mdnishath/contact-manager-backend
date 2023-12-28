import { ZodError } from 'zod';
import { TErrorIssue, TErrorResponse } from '../../interface/TErrorResponse';

export const handleZodError = (error: ZodError): TErrorResponse => {
  const issues: TErrorIssue[] = error.issues.map((issue) => {
    console.log(issue.path[issue.path.length - 1]);

    return {
      path: issue.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode: 400,
    status: 'error',
    message: 'Zod Error',
    issues,
  };
};
