import { Routes, Route } from "react-router-dom";
import { FormPage } from '../pages/FormPage.js';
import { HomePage } from '../pages/HomePage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

export const AllRoutes = () => {
  return (
   <>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post" element={<FormPage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
   </>
  )
}
