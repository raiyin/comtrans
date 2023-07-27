import React from 'react';
import { useForm } from 'react-hook-form';
import cl from './signup.module.scss';
import { Button, TextField } from '@mui/material';

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const onSubmit = (data: any) => {
    };

    return (

        <div className={cl['signup']} >

            <form onSubmit={handleSubmit(onSubmit)} className={cl['signup-form']}>
                <span className={cl['signup-form__header']}>
                    Welcome
                </span>

                <div className={cl['signup-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`email`}
                        label="Email"
                        variant="outlined"
                        {...register(`email`, { required: true })} />
                </div>

                <div className={cl['signup-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`password`}
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register(`password`, { required: true })} />
                </div>

                <div className={cl['signup-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`password`}
                        label="Repeat password"
                        type="password"
                        variant="outlined"
                        {...register(`password`, { required: true })} />
                </div>

                <Button
                    variant="outlined"
                >
                    Sign up
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

export default Signup;
