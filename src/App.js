import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import SignUp from "./pages/SignUp";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
