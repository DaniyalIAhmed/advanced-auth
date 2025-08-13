import axios from "axios";


export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/api/v1/auth"
})