import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import "../styles/navbar/navbar.css";

export const NavBar = () => {
	useAuth() // Detecting auth changes will change this component state 
	const storedLogin = localStorage.getItem("login");

	const navElements = [
		{
			route: "/",
			text: "Home",
		},
        {
			route: "/post",
			text: "Create",
		},
        {
			route: "/profile",
			text: "Profile",
		},
        
	];
	const notLoggedIn = [
		{
			route: "/",
			text: "Home",
		},
        {
			route: "/auth/login",
			text: "Log In",
		},
        {
			route: "/auth/register",
			text: "Make an Account",
		},
	]
	return (
		<div id="navbar">
			<Link id="app-title" to="/">Snippets</Link>
			<div id="routes">
				{ storedLogin !== 'false' ?
				<>
				{navElements.map((route, index) => (
					<div className={"route"} key={index}>
						<Link
							style={{ textDecoration: "none" }}
							to={route.route}
						>
							{route.text}
						</Link>
					</div>
				))} 
				</>
				: 
				<>
				{notLoggedIn.map((route, index) => (
					<div className={"auth-route"} key={index}>
						<Link
							style={{ textDecoration: "none" }}
							to={route.route}
						>
							{route.text}
						</Link>
					</div>
				))} 
				</>
}
			</div>
		</div>
	);
};
