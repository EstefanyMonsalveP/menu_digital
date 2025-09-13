import { Request } from "express";
import { UserJwtPayload } from "./index"; 

export interface AuthRequest extends Request {
  user?: UserJwtPayload;
}
