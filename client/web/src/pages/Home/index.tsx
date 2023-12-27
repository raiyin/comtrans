import React from 'react';
import styles from './styles.module.scss';
import Sidebar from '../../widgets/Sidebar/Sidebar';
import Map from '../../widgets/Map/Map';

const Home = () => {
    return (
        <div className={styles['home']} >
            <Sidebar></Sidebar>
            <Map></Map>
        </div>
    );
};

export default Home;
