import { Route, Routes } from 'react-router-dom';
import Login from "../pages/Login";
import Home from "../pages/Home";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default AppRouter;