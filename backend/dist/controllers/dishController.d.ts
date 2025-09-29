import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
export declare const createDish: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUserDishes: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateDish: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const removeDish: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=dishController.d.ts.map