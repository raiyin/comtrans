import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cl from './login.module.scss';
import { Button, TextField } from '@mui/material';


const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const onSubmit = (data: any) => {
    };


    return (

        <div className={cl['login']} >

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={cl['login-form']}>

                <span className={cl['login-form__header']}>
                    Welcome
                </span>

                <TextField
                    sx={{ width: '300px', marginTop: '20px' }}
                    id={`email`}
                    label="Email"
                    variant="outlined"
                    size="small"
                    {...register(`email`, { required: true })} />

                <TextField
                    sx={{ width: '300px', marginTop: '20px' }}
                    id={`password`}
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    {...register(`password`, { required: true })} />

                <Button
                    sx={{ marginTop: '20px' }}
                    variant="outlined"
                >
                    Login
                </Button>
            </form>
        </div >

    );
};

export default Login;
