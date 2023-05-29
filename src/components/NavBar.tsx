import { Link } from "react-router-dom";
import "../styles/navbar/navbar.css";

export const NavBar = () => {
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
	return (
		<div id="navbar">
			<h1>Snippets</h1>
			<div id="routes">
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
			</div>
		</div>
	);
};
