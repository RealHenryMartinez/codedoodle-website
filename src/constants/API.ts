import axios from "axios";

// Note: change to production as default
const webENV = import.meta.env.VITE_NODE_ENV || "production";

// Our base url
export let baseURL = "";
 
console.log(webENV);
if(webENV == "development"){
    baseURL = "https://snippetdeveloperbackend.onrender.com";
}
else if(webENV == "production"){
    baseURL = "https://snippetbackend.onrender.com/";
}
else {
    baseURL = "http://localhost:4000/";
}

export const app = axios.create({
    baseURL,
    withCredentials: true
})

axios.defaults.withCredentials = true;