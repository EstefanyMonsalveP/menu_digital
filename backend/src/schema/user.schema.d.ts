import { z } from "zod";
export declare const userRegisterSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=user.schema.d.ts.map