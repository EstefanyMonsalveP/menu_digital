import type { UserJwtPayload } from "../types";  

declare global {
  namespace Express {
    interface Request {
      user?: UserJwtPayload;  //user es del tipo UserJwtPayload
    }
  }
}
