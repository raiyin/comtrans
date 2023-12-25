import React, { useEffect } from 'react';
import './index.scss';
import AppRouter from '../router/AppRouter';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useActions } from '../hooks/useActions';


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
