import {z, ZodError} from "zod";

export const validator = (schema: z.ZodObject<any, any>, body: any) => {
    try {
        schema.parse(body);
    } catch (errors) {
        if (errors instanceof ZodError) {
            return Object.fromEntries(
                errors.issues.map(issue => [issue.path[0], issue.message])
            );
        }
    }
}