import { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { NavBar } from "./components/NavBar.js";
import { useAuth } from "./hooks/useAuth.js";
import { FormPage } from "./pages/FormPage.js";
import { HomePage } from "./pages/HomePage.js";
import { LoginPage } from "./pages/LoginPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { ProtectedRoute } from "./routes/ProtectedRoute.js";

function App() {
  const location = useLocation();
  const {} = useAuth();
  const [login, setLogin] = useState(false);
  const storedLogin = localStorage.getItem("login");
  console.log(storedLogin);
  useEffect(() => {
   

    if (storedLogin && storedLogin === "true") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  if (location.pathname !== "/auth/login" && !storedLogin) {
    return <Routes><Route path="/" element={<Navigate to="/auth/login" replace />} /></Routes>;
  }

  return (
    <div>
      {/* Add your navbar component here */}
      <NavBar />

      {/* Define the routes */}
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Protected routes */}
        {storedLogin !== 'false'  ? (
          <>
            <Route path="/post" element={<ProtectedRoute path="" element={<FormPage />} />} />
            <Route path="/*" element={<ProtectedRoute path="" element={<HomePage />} />} />
            <Route path="/profile" element={<ProtectedRoute path="" element={<ProfilePage />} />} />
          </>
        ) : <Route path="/*" element={<Navigate to="/auth/login" replace />} />}

        {/* Fallback route when no routes match */}
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
