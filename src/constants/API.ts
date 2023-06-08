import axios from "axios";

// Note: change to production as default
const webENV: string = "production";

export let baseURL: string = "https://snippetbackend.onrender.com/";

switch(webENV) {
    case "development":
        baseURL = "https://snippetbackend.onrender.com/";
        break;
    case "production":
        baseURL = "https://snippetbackend.onrender.com/";
        break
    case "local":
        baseURL = "http://localhost:4000/";
        break;
}

export const app = axios.create({
    baseURL,
    withCredentials: true
})

axios.defaults.withCredentials = true;