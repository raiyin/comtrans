import React from 'react';
import cl from './home.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map';

const Home = () => {
    return (
        <div className={cl['home']} >
            <Sidebar></Sidebar>
            <Map></Map>
        </div>
    );
};

export default Home;
