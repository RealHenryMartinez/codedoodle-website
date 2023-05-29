import { NavBar } from "./components/NavBar.js";
import { AllRoutes } from "./routes/AllRoutes.js";
import { AuthRoutes } from "./routes/AuthRoutes.js";
import { useAuth } from "./hooks/useAuth.js";

function App(): JSX.Element {
	const { login } = useAuth(); // checking if user is logged in
	switch (login) {
		case true:
			return (
				<>
					<NavBar />
					<AllRoutes />
				</>
			);
		case false:
			return (
				<>
					<AuthRoutes />
				</>
			);
	}
}

export default App;
