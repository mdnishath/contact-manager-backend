import { Response } from 'express';

type TSuccessResponse<T> = {
  statusCode: number;
  message: string;
  data: T | T[] | null;
};

// If data is present, its type should match the specified type in TSuccessResponse
export const sendSuccessResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    status: 'success',
    message: data.message,
    data: data.data,
  });
};
