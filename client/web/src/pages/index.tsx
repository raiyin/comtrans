import { lazy } from "react";
import { Route, Routes } from 'react-router-dom';

const NotFoundPage = lazy(() => import("./NotFound"));
const Login = lazy(() => import("./Login"));
const Home = lazy(() => import("./Home"));
const Signup = lazy(() => import("./Signup"));
const ActivationSuccess = lazy(() => import("./ActivationSuccess"));
const ActivationNeeded = lazy(() => import("./ActivationNeeded"));


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/activation/success" element={<ActivationSuccess />} />
            <Route path="/activation/needed" element={<ActivationNeeded />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
