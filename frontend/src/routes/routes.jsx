import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

import Home from "../pages/home/home";
import Login from "../pages/login/login";
import NotFound from "../pages/notfound/notfound";
import Reservation from "../pages/reservation/reservation";

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/entrar" element={<Login />} /> 
                <Route path="/reservation" element={<Reservation />} /> 
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};