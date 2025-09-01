import {z} from "zod";

export const LoginSchema = z.object({
    login: z.string().min(3, "Логин должен содержать от 6 символов"),
    password: z.string().min(8,  "Пароль должен содержать от 8 символов"),
});