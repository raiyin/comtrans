import React from 'react';
import { Button, Stack, TextInput } from '@react-native-material/core';

const Signup = (): JSX.Element => {
    return (

        <Stack fill center spacing={4} >

            <TextInput
                style={{ width: 220 }}
                label="Email"
                variant="outlined"
            />

            <TextInput
                style={{ width: 220 }}
                secureTextEntry={true}
                variant="outlined"
                label="Password"
            />

            <TextInput
                style={{ width: 220 }}
                secureTextEntry={true}
                variant="outlined"
                label="Confirm password"
            />

            <Button variant="outlined" title="Sign up" />
        </Stack>
    );
};

export default Signup;
