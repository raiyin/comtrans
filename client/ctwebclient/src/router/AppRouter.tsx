import { Route, Routes } from 'react-router-dom';
import Login from "../pages/Login/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup/Signup";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
};

export default AppRouter;
