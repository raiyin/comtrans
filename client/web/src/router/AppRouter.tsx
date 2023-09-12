import { Route, Routes } from 'react-router-dom';
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import ActivationSuccess from '../pages/Activation/ActivationSuccess';
import ActivationNeeded from '../pages/Activation/ActivationNeeded';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/activation/success" element={<ActivationSuccess />} />
            <Route path="/activation/needed" element={<ActivationNeeded />} />
        </Routes>
    );
};

export default AppRouter;
