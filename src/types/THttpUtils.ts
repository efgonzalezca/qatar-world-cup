import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IPayload extends JwtPayload {
  document: string,
}
export interface ICustomRequest extends Request {
  payload?: IPayload,
}