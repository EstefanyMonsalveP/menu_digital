export declare const authenticateUser: (email: string, password: string) => Promise<{
    user: import("mongoose").Document<unknown, {}, import("../models/user").IUser, {}, {}> & import("../models/user").IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
    token: string;
}>;
//# sourceMappingURL=authService.d.ts.map