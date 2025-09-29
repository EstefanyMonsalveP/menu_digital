import { Request } from "express";
import { UserJwtPayload } from "./UsertJwtPayLoad"; 

export interface AuthRequest extends Request {
  user?: UserJwtPayload;
}
