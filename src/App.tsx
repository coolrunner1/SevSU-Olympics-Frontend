import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {ProtectedAdminRoutes} from "./utils/ProtectedAdminRoutes.tsx";
import {ProtectedUserRoutes} from "./utils/ProtectedUserRoutes.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {TaskPage} from "./pages/User/TaskPage.tsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route element={<ProtectedAdminRoutes/>}></Route>
            <Route element={<ProtectedUserRoutes/>}></Route>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/tasks' element={<TaskPage/>}/>
            <Route path='/tasks/:id' element={<TaskPage/>}/>
            <Route path='*' element={<Navigate to='/login' replace/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
