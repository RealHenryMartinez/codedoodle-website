import * as React from "react";
import { app } from "../constants/API.js";
import { setUser } from "../store/slices/authSlice.js";
import Cookies from "js-cookie";
import { useAppDispatch } from "../store/hook.js";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../interfaces/IAuth.js";

export const useAuth = () => {
  const [login, setLogin] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDoneRef = React.useRef(false);

  const handleLogout = () => {
    Cookies.remove("token");
    setLogin(false);
    localStorage.removeItem("user"); // Remove the user data from local storage
  };

  const handleLogin = async (userInfo: ILogin) => {
    try {
      const response = await app.post("/auth/login", {
        email: userInfo.email,
        password: userInfo.password,
      });
      Cookies.set("token", response.data.token, {
        expires: 1,
        secure: true,
      });
      await setLogin(true); // Update the login state to true
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Save the user data to local storage
      navigate('/')
    } catch (ex) {
      throw ex;
    }
  };

  React.useEffect(() => {
    const verifyCookie = async () => {
      const token = await Cookies.get();
      if (typeof(token) === "object" || token === undefined) {
        localStorage.setItem("login", "false");
        setLogin(false);
        localStorage.removeItem("user");
      }
      if (token && !isDoneRef.current) {
        isDoneRef.current = true;
        try {
          const { data } = await app.post("", {}, { withCredentials: true });
          const { user } = data;
          if (user !== undefined) {
            dispatch(setUser(user));
            setLogin(true);
            await localStorage.setItem("login", "true");
            localStorage.setItem("user", JSON.stringify(user));
          }
          
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    verifyCookie();
  }, [Cookies]); // Add an empty dependency array here
  
  // Return the necessary values and functions
  return {
    handleLogin,
    handleLogout,
    login,
  };
};
