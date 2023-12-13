import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Button, IconButton, InputBase, ThemeProvider, Toolbar, Typography, alpha, createTheme, styled } from '@mui/material';
import { Navigate, useNavigate } from 'react-router';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import AuthBar from '../AuthBar/AuthBar';


const Header = () => {

    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const currentUser = useTypedSelector(state => state.authStateReducer.currentUser);
    const isAuth = useTypedSelector(state => state.authStateReducer.isAuth);
    const isProccessing = useTypedSelector(state => state.authStateReducer.isProccessing);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    return (

        <header>

            <ThemeProvider theme={darkTheme}>

                <AppBar component="nav">
                    <Toolbar>

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            COMTRANS
                        </Typography>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>

                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button
                                key={'contact'}
                                sx={{ color: '#fff' }}
                                onClick={() => navigate('/contact')}
                            >
                                Contact
                            </Button>
                        </Box>


                        {
                            isProccessing ?
                                <></> :
                                isAuth ?
                                    <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                        {currentUser.username[0]}
                                    </Avatar>
                                    :
                                    <AuthBar />
                        }


                    </Toolbar>
                </AppBar>
            </ThemeProvider>

        </header>

    );
};

export default Header;
