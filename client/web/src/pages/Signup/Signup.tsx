import React, { ChangeEvent, useEffect, useState } from 'react';
import cl from './signup.module.scss';
import { Button, FormControl, TextField } from '@mui/material';
import validateEmail from '../../utils/email';


const Signup = () => {

    const [login, setLogin] = useState('');
    const [wasLoginModified, setWasLoginModified] = useState(false);

    const [email, setEmail] = useState('');
    const [wasEmailModified, setWasEmailModified] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');

    const [password, setPassword] = useState('');
    const [wasPasswordModified, setWasPasswordModified] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [wasConfirmPasswordModified, setWasConfirmPasswordModified] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState('');

    const loginChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWasLoginModified(true);
        setLogin(() => e.target.value);
    };

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWasEmailModified(true);
        setEmail(() => e.target.value);
    };

    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWasPasswordModified(true);
        setPassword(() => e.target.value);
    };

    const confirmPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWasConfirmPasswordModified(true);
        setConfirmPassword(() => e.target.value);
    };

    useEffect(() => {
        if (wasEmailModified && !validateEmail(email)) {
            setEmailErrorText(() => 'Please enter a correct email');
        }
        else {
            setEmailErrorText(() => '');
        }
    }, [email]);

    useEffect(() => {
        if (wasConfirmPasswordModified && confirmPassword !== password) {
            setPasswordErrorText(() => 'Passwords must be equal');
        }
        else {

            setPasswordErrorText(() => '');
        }
    }, [confirmPassword]);

    const registerUser = (data: any) => {
    };

    return (

        <div className={cl['signup']} >

            <FormControl className={cl['signup-form']}>
                <span className={cl['signup-form__header']}>
                    Welcome
                </span>

                <div className={cl['signup-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`login`}
                        label="Login"
                        variant="outlined"
                        required
                        value={login}
                        helperText={login === "" && wasLoginModified ? 'Empty field!' : ' '}
                        onChange={loginChangeHandler}
                    />
                </div>

                <div className={cl['signup-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`email`}
                        label="Email"
                        variant="outlined"
                        value={email}
                        required
                        helperText={emailErrorText}
                        onChange={emailChangeHandler}
                    />
                </div>

                <div className={cl['signup-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`password`}
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        required
                        helperText={password === "" && wasPasswordModified ? 'Empty field!' : ' '}
                        onChange={passwordChangeHandler}
                    />
                </div>

                <div className={cl['signup-form__item']}>
                    <TextField
                        sx={{ width: '300px' }}
                        id={`confirm_password`}
                        label="Confirm password"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        required
                        helperText={passwordErrorText}
                        onChange={confirmPasswordChangeHandler}
                    />
                </div>

                <Button
                    variant="outlined"
                    type="submit"
                >
                    Sign up
                </Button>


            </FormControl>
        </div >
    );
};

export default Signup;
