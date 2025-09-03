import {Navigate, Outlet} from "react-router";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import type {User} from "../types/user.ts";
import {ADMIN_ROLE} from "../constants/roles.ts";
import {AdminHeader} from "../components/Admin/Global/AdminHeader.tsx";

export const ProtectedAdminRoutes = () => {
    const user = useAuthUser<User>()

    return user ?
        user.role === ADMIN_ROLE
            ? <>
                <AdminHeader/>
                <Outlet/>
            </>
            : <Navigate to={"/tasks"}/>
        : <Navigate to={"/login"}/>;
}