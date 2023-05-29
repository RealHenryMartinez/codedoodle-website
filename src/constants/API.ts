import axios from "axios";

export const baseURL: string = "http://localhost:4000/";

export const app = axios.create({
    baseURL,
    withCredentials: true
})

axios.defaults.withCredentials = true;