import React, { useRef } from "react";
import { useAuth } from "../hooks/useAuth.js";
import "../styles/auth/login.css";
import { useNavigate } from "react-router-dom";
import { handleError } from "../hooks/useError.js";
import IError from "../interfaces/form/IError.js";
import { LoginError } from "../components/LoginError.js";
import { handleFormError } from "../hooks/useFormError.js";

let checkForError: IError = {
	show: false,
	message: "",
};

export const LoginPage = () => {
	const { handleLogin } = useAuth();
	const navigate = useNavigate();
	const [isAlertVisible, setIsAlertVisible] = React.useState<IError>({
		show: false,
		message: "",
	});

	React.useEffect(() => {
		checkForError = isAlertVisible;
	}, [isAlertVisible]); // <-- here put the param

	// Initialize the login values
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Get the current referenced values
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		const userInfo = {
			email,
			password,
		};
 
		if (email && password) {
			handleLogin(userInfo)
				.then(() => {
					// Update the login state
					navigate("/");
				})
				.catch((error) => {
					// Handle login error
					handleFormError(setIsAlertVisible, error.response.data);
				});
		}
	};

	return (
		<div className="form">
      <LoginError checkForError={isAlertVisible}/>
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<div className="input-container">
					<label>Email</label>
					<br />
					<input ref={emailRef} type="email" name="email" required />
				</div>
				<div className="input-container">
					<label>Password</label>
					<br />
					<input
						ref={passwordRef}
						type="password"
						name="pass"
						required
					/>
				</div>
				<div className="button-container">
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};
