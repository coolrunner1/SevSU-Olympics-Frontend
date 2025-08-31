import {BlurryInput} from "../components/Global/Inputs/BlurryInput.tsx";
import {BlueButton} from "../components/Global/Buttons/RegularButtons/BlueButton.tsx";
import {InputError} from "../components/Global/Inputs/InputError.tsx";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {login} from "../api/auth.ts";
import type {LoginErrors} from "../types/auth.ts";
import {LoginSchema} from "../ValidationSchemas/auth.ts";
import {validator} from "../utils/validator.ts";
import {OkModal} from "../components/Global/Modals/OkModal.tsx";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import type {AxiosError} from "axios";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginErrors | null>(null);
    const signIn = useSignIn();

    const {mutate} = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            //signIn(data.token);
            console.log(data);
        },
        onError: (error: AxiosError) => {
            console.error('Login error:', error);
            if (error.status === 422) {
                setErrors({
                    login: "Errors.invalid-login-password",
                    password: "Errors.invalid-login-password"
                });
                return;
            }
            setErrors({server: "Сервер недоступен на данный момент"});
        }
    });

    const handleLogin = () => {
        const body = {
            login: username,
            password
        }

        const validationErrors = validator(LoginSchema, body) || null

        if (!validationErrors) {
            mutate(body);
            return;
        }

        setErrors(validationErrors);
        setTimeout(() => {
            setErrors(null);
        }, 10000);
    }

    return (
        <>
            {errors?.server &&
                <OkModal
                    message={errors.server}
                    setClose={() => setErrors(null)}
                />
            }
            <div className="text-white min-h-screen flex flex-col sm:justify-center sm:py-12 bg-center bg-cover"
                 style={{backgroundImage: `url('/login-bg.jpg')`}}>
                <div
                    className="w-full h-screen pt-14 sm:pt-auto sm:w-auto sm:h-auto p-10 xs:p-0 sm:mx-auto md:w-full md:max-w-md sm:rounded-lg sm:shadow backdrop-blur-xl bg-[#0000001f]">
                    <h1 className="font-bold text-center text-2xl mb-5">Олимпиада по спортивному программированию</h1>
                    <div className="w-full">
                        <form className="px-5 py-7">
                            <BlurryInput
                                label={"Логин"}
                                type={"text"}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <InputError error={errors?.login}/>
                            <BlurryInput
                                label={"Пароль"}
                                type={"password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputError error={errors?.password}/>
                            <BlueButton
                                label={"Войти"}
                                type={"button"}
                                onClick={() => handleLogin()}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}