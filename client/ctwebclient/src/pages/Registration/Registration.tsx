import React from 'react';
import { useForm } from 'react-hook-form';
import cl from './register.module.scss';
import { Button, TextField } from '@mui/material';

const Registration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const onSubmit = (data: any) => {
    };

    return (

        <div className={cl['register']} >

            <form onSubmit={handleSubmit(onSubmit)} className={cl['register-form']}>
                <span className={cl['register-form__header']}>
                    Welcome
                </span>

                <div className={cl['register-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`email`}
                        label="Email"
                        variant="outlined"
                        {...register(`email`, { required: true })} />
                </div>

                <div className={cl['register-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`password`}
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register(`password`, { required: true })} />
                </div>

                <div className={cl['register-form__item']}>
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
                    Registration
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

export default Registration;
