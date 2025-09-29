import type { UserJwtPayload } from "../types";
export declare const generateToken: (payload: object) => Promise<string>;
export declare const verifyToken: (token: string) => UserJwtPayload;
//# sourceMappingURL=tokenUtils.d.ts.map