import axios from 'axios';
import { ACCESS_TOKEN } from '@/lib/tokens';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: apiUrl,
})

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        const googleAccessToken = localStorage.getItem("GOOGLE_ACCESS_TOKEN");
        if (googleAccessToken) {
            config.headers["X-Google-Access-Token"] = googleAccessToken
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default api;