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

            <form onSubmit={handleSubmit(onSubmit)} className={cl['login-form']}>
                <span className={cl['login-form__header']}>
                    Welcome
                </span>

                <div className={cl['login-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`email`}
                        label="Email"
                        variant="outlined"
                        {...register(`email`, { required: true })} />
                </div>

                <div className={cl['login-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`password`}
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register(`password`, { required: true })} />
                </div>

                <Button
                    variant="outlined"
                >
                    Login
                </Button>
                <br />
                <div style={{ color: 'red' }}>
                    {Object.keys(errors).length > 0 &&
                        'There are errors, check your console.'}
                </div>
            </form>
        </div >

    );
};

export default Login;
