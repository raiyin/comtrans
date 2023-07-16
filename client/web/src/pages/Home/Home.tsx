import React from 'react';
import cl from './home.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {
    return (
        <div className={cl['home']} >
            <Sidebar></Sidebar>
            <section className={cl['map']}></section>
        </div>
    );
};

export default Home;
