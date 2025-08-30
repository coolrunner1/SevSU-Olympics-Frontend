import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'
import AuthProvider from "react-auth-kit";
import {authStore} from "./utils/authStore.ts";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./api/queryClient.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider
            store={authStore}
        >
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>,
)