import {Navigate, Outlet} from "react-router";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import type {User} from "../types/user.ts";
import {USER_ROLE} from "../constants/roles.ts";

export const ProtectedUserRoutes = () => {
    const user = useAuthUser<User>()

    return user ?
        user.role === USER_ROLE
            ? <Outlet/>
            : <Navigate to={"/"}/>
        : <Navigate to={"/login"}/>;
}