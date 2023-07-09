import React from 'react';
import { Button, Stack, TextInput } from "@react-native-material/core";


const Login = (): JSX.Element => {
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

            <Button variant="outlined" title="Log in" />
        </Stack>
    );
};

export default Login;
