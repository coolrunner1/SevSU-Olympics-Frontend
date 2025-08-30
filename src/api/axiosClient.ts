import axios, {type AxiosResponse} from "axios";
import Cookies from 'js-cookie'

const axiosClient = axios.create({
    baseURL: `http://localhost:4000/api`,
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
        if (res.status === 401) {
            alert('Сессия истекла');
            //signOut();
            window.location.href = "/";
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
            alert('Not implemented');
        }
        console.error("Возникла проблема. Код ошибки: " + res.status);
        console.error(error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("_auth");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;