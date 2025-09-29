import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/authRequest";
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authMiddleware.d.ts.map