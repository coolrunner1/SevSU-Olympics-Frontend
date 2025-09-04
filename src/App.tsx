import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {ProtectedAdminRoutes} from "./utils/ProtectedAdminRoutes.tsx";
import {ProtectedUserRoutes} from "./utils/ProtectedUserRoutes.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {TaskPage} from "./pages/User/TaskPage.tsx";
import {UsersManagementPage} from "./pages/Admin/UsersManagementPage.tsx";
import {ContestPage} from "./pages/User/ContestPage.tsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route element={<ProtectedAdminRoutes/>}>
                <Route path="*" element={<Navigate to={"/admin/users"} replace />}/>
            </Route>
            <Route path={"admin"} element={<ProtectedAdminRoutes/>}>
                <Route path={"users"} element={<UsersManagementPage/>}/>
            </Route>
            <Route element={<ProtectedUserRoutes/>}>
                <Route path='/tasks' element={<TaskPage/>}/>
                <Route path='/tasks/:id' element={<TaskPage/>}/>
                <Route path='/welcome' element={<ContestPage/>}/>
                <Route path="*" element={<Navigate to={"/tasks"} replace />}/>
            </Route>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='*' element={<Navigate to='/login' replace/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
