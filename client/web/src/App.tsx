import React, { useEffect } from 'react';
import './styles/App.css';
import AppRouter from './router/AppRouter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useActions } from './hooks/useActions';


function App() {

    const {
        checkAuth
    } = useActions();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'))
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
