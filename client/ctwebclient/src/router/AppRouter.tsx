import { Route, Routes } from 'react-router-dom';
import Login from "../pages/Login/Login";
import Home from "../pages/Home";
import Registration from "../pages/Registration/Registration";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
        </Routes>
    );
};

export default AppRouter;
