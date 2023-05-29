
import { Routes, Route } from "react-router-dom";
import { LoginPage } from '../pages/LoginPage.js';

export const AuthRoutes = () => {
    
  return (
   <>
      <Routes>
          <Route index element={<LoginPage />} />
          {/* <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post" element={<FormPage />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
   </>
  )
}
