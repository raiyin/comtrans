import React from 'react';
import cl from './footer.module.css';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkIcon from '@mui/icons-material/Link';
import Link from '@mui/material/Link';
import { Paper, ThemeProvider, createTheme } from '@mui/material';

const Footer = () => {


    const darkTheme = createTheme({ palette: { mode: 'dark' } });

    return (

        <ThemeProvider theme={darkTheme}>
            <Paper square>
                <div className={cl.footer}>
                    <div className={cl['footer__logo']}>
                        © COMTRANS - 2023
                    </div>
                    <div className={cl['footer__social']}>
                        <Link href="mailto:raiyin@ya.ru" underline="always">
                            <EmailIcon sx={{ fontSize: 30, mr: 1 }} />
                        </Link>
                        <Link href="https://t.me/my_important_talks" underline="always">
                            <TelegramIcon sx={{ fontSize: 30, mr: 1 }} />
                        </Link>
                        <Link href="https://publicmaders.ru" underline="always">
                            <LinkIcon sx={{ fontSize: 30 }} />
                        </Link>
                    </div>
                </div>

            </Paper>
        </ThemeProvider>

    );
};

export default Footer;
