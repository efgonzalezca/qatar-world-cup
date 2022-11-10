import { Request } from 'express';

export class ErrorHandler extends Error {
  constructor(public statusCode: number, public code: number, public message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.code = code;
  }
}

export const getIpAddress = (req: Request) => {
  if (req.headers['x-forwarded-for'] && typeof req.headers['x-forwarded-for'] === 'string') {
    return req.headers['x-forwarded-for'].split(',')[0];
  }
  return undefined;
}