import React, { useEffect } from 'react';
import './index.scss';
import AppRouter from 'pages';
import Header from '../widgets/Header/Header';
import Footer from '../widgets/Footer/Footer';
import { useActions } from '../shared/api/store/hooks/useActions';


function App() {

    const {
        checkAuth
    } = useActions();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth();
        }
    }, []);

    return (
        <div className="app">
            <Header />
            <AppRouter />
            <Footer />
        </div>
    );
}

export default App;
