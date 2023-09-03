// This code is a custom hook called useAuth, which provides authentication functionality in a React application.

import * as React from "react";
import { app } from "../constants/API.js";
import { fetchUser, setUser } from "../store/slices/authSlice.js";
import Cookies from "js-cookie";
import { useAppDispatch} from "../store/hook.js";
import { useNavigate } from "react-router-dom";
import { ILogin, IUser } from "../interfaces/IAuth.js";
import { setUserCard } from "../store/slices/postSlice.js";

// Function to handle logout - does not refresh page when used as it is out of scope of the useAuth making this a preffered function to use
export const handleLogout = () => {
  Cookies.remove("token"); // Remove the token from cookies
  // Remove the user data from local storage
  localStorage.setItem("login", "false");
};

// The useAuth hook function definition
export const useAuth = () => {
  // State variables
  const expirationDays = 1;
  const [login, setLogin] = React.useState<boolean>(false); // Represents the login state
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDoneRef = React.useRef(false);
  // Function to handle login
  const handleLogin = async (userInfo: ILogin) => {
    // Make a POST request to the "/auth/login" API endpoint
    const response = await app.post("/auth/login", {
      email: userInfo.email,
      password: userInfo.password,
    });

    // Set the token in cookies with expiration and security options
    Cookies.set("token", response.data.token, { expires: expirationDays });
    if (response === undefined) {
      return;
    }
    await setLogin(true); // Update the login state to true
    await localStorage.setItem("login", "true");
    dispatch(setUser(response.data.user)); // Dispatch an action to set the user in the Redux store
    dispatch(setUserCard(response.data.user)); // Dispatch an action to set the user card in the Redux store
    navigate("/");
  };
  const handleRegister = async (userInfo: IUser) => {
    // Make a POST request to the "/auth/login" API endpoint
    const response = await app.post("/auth/register", {
      email: userInfo.email,
      password: userInfo.password,
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
    });

    // Set the token in cookies with expiration and security options
    // Setting for one day
    Cookies.set("token", response.data.token, { expires: expirationDays });

    if (response === undefined) {
      return;
    }
    await setLogin(true); // Update the login state to true
   
    await localStorage.setItem("login", "true");
    localStorage.setItem("user", JSON.stringify(response.data.user)); // Save the user data to local storage


    // We want the state to remain
    dispatch(setUser(response.data.user)); // Dispatch an action to set the user in the Redux store
    dispatch(setUserCard(response.data.user)); // Dispatch an action to set the user card in the Redux store
  };

  React.useEffect(() => {
    // Function to verify the existence of cookies and perform actions accordingly
    const verifyCookie = async () => {
      const token = Cookies.get("token"); // Get the token from cookies
      if (typeof token === "object" || token === undefined) {
        localStorage.setItem("login", "false"); // Set login state to false in local storage
        setLogin(false); // Update the login state to false
        handleLogout();
      }
      if (token && !isDoneRef.current) {
        isDoneRef.current = true;
        try {
          // Make a POST request to verify the token with the API
          const userData = await dispatch(fetchUser(token));
          if (userData.payload !== undefined) {
            dispatch(setUser(userData.payload)); // Dispatch an action to set the user in the Redux store
            dispatch(setUserCard(userData.payload)); // Dispatch an action to set the user card in the Redux store
            setLogin(true); // Update the login state to true
            await localStorage.setItem("login", "true"); // Set login state to true in local storage

            // We navigate to the home page because we don't refresh the user account unless the cookies are updated
            navigate("/"); // Navigate to the home page
          }
          
        } catch (error) {
          console.error(error);
        }
      }
    };

    verifyCookie(); // Call the verifyCookie function when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, dispatch]); // Add an empty dependency array here to prevent unnecessary re-renders

  // Return the necessary values and functions
  return {
    handleLogin,
    handleLogout,
    handleRegister,
    login,
  };
};
