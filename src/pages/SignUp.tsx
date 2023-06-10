import React, { useRef } from "react";
import { useAuth } from "../hooks/useAuth.js";
import "../styles/auth/login.css";
import { useNavigate } from "react-router-dom";
import IError from "../interfaces/form/IError.js";
import { LoginError } from "../components/LoginError.js";
import { handleFormError } from "../hooks/useFormError.js";

let checkForError: IError = {
	show: false,
	message: '',
};

export const SignUp = () => {
	const { handleRegister } = useAuth();
    const [isAlertVisible, setIsAlertVisible] = React.useState<IError>({
		show: false,
		message: '',
	});

    React.useEffect(() => {
		checkForError = isAlertVisible;
    },[isAlertVisible]) // <-- here put the param

	const navigate = useNavigate();
	// Initialize the login values
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const firstNameRef = useRef<HTMLInputElement | null>(null);
	const lastNameRef = useRef<HTMLInputElement | null>(null);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Get the current referenced values
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		const firstName = firstNameRef.current?.value;
		const lastName = lastNameRef.current?.value;
		const userInfo = {
			email,
			password,
			firstName,
			lastName,
		};

		if (userInfo) {
			handleRegister(userInfo)
				.then(() => {
					// Update the login state
					navigate("/");
				})
				.catch((error) => {
					// Handle login error
					console.log(error)
                    handleFormError(setIsAlertVisible,error.response.data)
				});
		}
	};

	return (
		<div className="form">
            <LoginError checkForError={isAlertVisible}/>
			<h1>Register</h1>
			
			<form onSubmit={onSubmit}>
				<div className="input-container">
					<label>First Name</label>
					<br />
					<input
						ref={firstNameRef}
						type="text"
						name="first-name"
						required
					/>
				</div>
				<div className="input-container">
					<label>Last Name</label>
					<br />
					<input
						ref={lastNameRef}
						type="text"
						name="last-name"
						required
					/>
				</div>
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
