import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const api = axios.create({
   
    baseURL: API_BASE_URL,
    withCredentials: true,

});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);