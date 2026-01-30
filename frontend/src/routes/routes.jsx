import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

import Login from "../pages/loginPage/loginPage";
import NotFound from "../pages/notfound/notfound";
import Dashboard from "../pages/dashboard/dashboard";
import Reservation from "../pages/reservation/reservation";
import Profile from "../pages/profileSettings/profileSettings";

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/profile" element={<Profile />} /> 
                <Route path="/dashboard" element={<Dashboard />} /> 
                <Route path="/reservation" element={<Reservation />} /> 
            </Routes>
        </Router>
    );
};