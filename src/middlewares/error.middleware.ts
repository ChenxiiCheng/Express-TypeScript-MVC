import { Request, Response, NextFunction, Errback } from 'express';

interface IError extends Error {
  status?: number;
}

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err: IError = new Error('Not Found');
  err.status = 404;

  next(err);
};

export const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(err.status || 500).json({
    message: err.message,
    status: err.status,
    stack: err.stack,
  });
};
