import React from 'react';
import styles from './styles.module.scss';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const Sidebar = () => {

    const [city, setCity] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };

    return (

        <aside className={styles['sidebar']}>
            <FormControl fullWidth size="small">
                <InputLabel id="city-label">City</InputLabel>
                <Select
                    labelId="city-label"
                    id="city-select"
                    value={city}
                    label="City"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </aside>
    );
};

export default Sidebar;
