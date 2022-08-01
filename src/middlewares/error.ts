import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../errors/catalog';

export default (
  err: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, error } = mappedError;
    return res.status(httpStatus).json({ error });
  }
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error !' });
};
