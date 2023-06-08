import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { NavBar } from "./components/NavBar.js";
import { useAuth } from "./hooks/useAuth.js";
import { FormPage } from "./pages/FormPage.js";
import { HomePage } from "./pages/HomePage.js";
import { ImageUpload } from "./pages/ImageUpload.js";
import { LoginPage } from "./pages/LoginPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { SignUp } from "./pages/SignUp.js";
import ViewCard from "./pages/ViewCard.js";
import { ProtectedRoute } from "./routes/ProtectedRoute.js";

function App() {
	const location = useLocation();
	const {} = useAuth();
	const storedLogin = localStorage.getItem("login");
	console.log(storedLogin);


	if (location.pathname !== "/auth/login" && storedLogin === "false") {
		return (
			<>
				<NavBar />
				<Routes>
					<Route
						path="/auth/login"
						element={<Navigate to="/auth/login" replace />}
					/>
					<Route path="/auth/register" element={<SignUp />} />
					<Route path="/create/view-card/:id" element={<ViewCard />} />
					<Route path="/*" element={<HomePage />} />
				</Routes>
			</>
		);
	}

	return (
		<div>
			{/* Add your navbar component here */}
			<NavBar />

			{/* Define the routes */}
			<Routes>
				<Route path="/auth/login" element={<LoginPage />} />
				<Route path="/create/view-card/:id" element={<ViewCard />} />
				<Route path="/*" element={<HomePage />} />
				{/* Protected routes */}
				{storedLogin !== "false" ? (
					<>
						<Route
							path="/post/*"
							element={
								<ProtectedRoute
									path=""
									element={<FormPage />}
								/>
							}
						/>
						<Route
							path="/edit-image"
							element={
								<ProtectedRoute
									path=""
									element={<ImageUpload />}
								/>
							}
						/>
						<Route
							path="/profile"
							element={
								<ProtectedRoute
									path=""
									element={<ProfilePage />}
								/>
							}
						/>
					</>
				) : (
					<Route
						path="/*"
						element={<Navigate to="/auth/login" replace />}
					/>
				)}

				{/* Fallback route when no routes match */}
				<Route path="/*" element={<Navigate to="/" replace />} />
			</Routes>
		</div>
	);
}

export default App;
