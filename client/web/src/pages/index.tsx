import { lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import Loading from "shared/components/Loading";

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
            <Route
                path="/login"
                element={
                    <Suspense fallback={<Loading />}>
                        <Login />
                    </Suspense>
                }
            />
            <Route
                path="/signup"
                element={
                    <Suspense fallback={<Loading />}>
                        <Signup />
                    </Suspense>
                }
            />
            <Route path="/activation/success" element={<ActivationSuccess />} />
            <Route path="/activation/needed" element={<ActivationNeeded />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
