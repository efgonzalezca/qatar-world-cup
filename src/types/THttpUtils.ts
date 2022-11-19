import { JwtPayload } from 'jsonwebtoken';

export interface IPayload extends JwtPayload {
  document: string,
}