import React from 'react'
import styles from './styles.module.scss';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const NotFound = () => {


    const navigate = useNavigate();

    return (
        <section className={styles['notfound']}>
            <div className={styles['notfound-code']}>
                404
            </div>
            <div className={styles["notfound-description"]}>
                <span>Sorry, this page</span>
                <span>isn't available!</span>

                <Button
                    key={'home'}
                    onClick={() => navigate('/')}
                    variant="contained"
                    sx={{
                        width: 300,
                    }}
                >
                    Home
                </Button>
            </div>
        </section>
    )
}

export default NotFound
