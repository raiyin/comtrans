import React from 'react';
import './styles/App.css';
import AppRouter from './router/AppRouter';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
    return (
        <div className="App">
            <Header />
            <AppRouter />
            <Footer />
        </div>
    );
}

export default App;
