import React from "react";
import { app } from "../constants/API.js";
import { ILogin } from "../interfaces/IAuth.js";
import Cookies from "js-cookie";
import { useAppDispatch } from "../store/hook.js";
import { setUser } from "../store/slices/authSlice.js";

export const useAuth = () => {
  const [login, setLogin] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const verifyCookie = async () => {
      const token = await Cookies.get();
      if (token) {
        const { data } = await app.post("", {}, { withCredentials: true });
        const { user } = data;
        dispatch(setUser(user));
        setLogin(true);
        console.log(login);
      }
    };

    verifyCookie();
  }, [dispatch, login]);

  const handleLogout = () => {
    Cookies.remove("token");
    setLogin(false);
  };

  const handleLogin = async (userInfo: ILogin) => {
    try {
      const response = await app.post("/auth/login", {
        email: userInfo.email,
        password: userInfo.password,
      });
      console.log(response);
      Cookies.set("token", response.data.token, {
        expires: 1,
        secure: true,
      });
      setLogin(true);
    } catch (ex) {
      throw ex;
    }
  };

  return {
    handleLogin,
    handleLogout,
    login,
  };
};
