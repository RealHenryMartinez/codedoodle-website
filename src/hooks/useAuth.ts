import React from "react";
import { app } from "../constants/API.js";
import { ILogin } from "../interfaces/IAuth.js";
// npm i --save-dev @types/js-cookie
import Cookies from "js-cookie";
import { useAppDispatch } from "../store/hook.js";
import { setUser } from "../store/slices/authSlice.js";

export const useAuth = () => {
	const [login, setLogin] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		// Check if a token cookie exists
		const verifyCookie = async () => {
			const token = await Cookies.get();
			if (token) {
				const { data } = await app.post(
					"",
					{},
					{ withCredentials: true }
				);

				const { user } = data;

				dispatch(setUser(user));
				setLogin((prev) => (prev = true));
			}
		};
		verifyCookie();
	}, [Cookies]);

	const handleLogout = () => {
		// Perform your logout logic here
		// Remove the token cookie
		Cookies.remove("token");
		setLogin((prev) => (prev = false));
	};

	const handleLogin = async (userInfo: ILogin) => {
		try {
			const response = await app.post("/auth/login", {
				email: userInfo.email,
				password: userInfo.password,
			});
			console.log(response);
			// Set our cookie
			Cookies.set("token", response.data.token, {
				expires: 1,
				secure: true,
			});
			setLogin((prev) => (prev = true));
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
