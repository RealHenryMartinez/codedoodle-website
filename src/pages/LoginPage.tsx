import React, { useRef } from "react";
import { useAuth } from "../hooks/useAuth.js";
import "../styles/auth/login.css";

export const LoginPage = () => {
	const { handleLogin } = useAuth();
	// INitialalize the login values
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
			console.log(`Password: ${password}, Email: ${email}`);
			handleLogin(userInfo);
			console.log("ok");
		}
	};

	return (
		<div className="form">
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
