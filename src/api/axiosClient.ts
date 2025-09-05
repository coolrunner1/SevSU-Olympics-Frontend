import axios, {type AxiosResponse} from "axios";
import Cookies from 'js-cookie'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || `http://localhost:8080/api`,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const res: AxiosResponse = error.response;
        if (!res) {
            const customError = {
                message: "Сервер недоступен"
            }
            return Promise.reject(customError);
        }
        if (res.status === 401) {
            if (window.location.pathname === '/login') return Promise.reject(error);
            alert('Сессия истекла');
            window.location.href = "/";
        }
        if (res.status === 403) {
            if (window.location.pathname.includes('/task')) {
                /*Cookies.remove("_auth");
                Cookies.remove("_auth_type", "");
                Cookies.set("_auth_state", "");*/
                window.location.href = "/";
            }
        }
        if (!res) return Promise.reject(error);
        if (res.status === 400) {
            let errorMsg = "";
            if (res.data.details) {
                res.data.details.forEach((item: {message: string}) => {
                    errorMsg += item.message+"\n";
                })
            } else {
                errorMsg = res.data.message;
            }
            alert(errorMsg);
        }
        if (res.status === 409) {
            alert(res.data.message);
        }
        if (res.status === 501) {
            alert('Не реализовано');
        }
        console.error(error);
        error.message = "Возникла проблема. Код ошибки: " + res.status;
        return Promise.reject(error);
    }
);

axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("_auth");
        if (token) {
            config.headers.Authorization = "Bearer "+token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;