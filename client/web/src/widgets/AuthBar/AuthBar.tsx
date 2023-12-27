import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';


const navItems = ['login', 'signup'];

const AuthBar = () => {

    const navigate = useNavigate();

    return (

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item: string) => (
                <Button
                    key={item}
                    sx={{ color: '#fff' }}
                    onClick={() => navigate(item)}
                >
                    {item}
                </Button>
            ))}
        </Box>
    )
}

export default AuthBar
