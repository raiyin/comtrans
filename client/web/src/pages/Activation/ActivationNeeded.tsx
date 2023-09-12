import cl from './activationsuccess.module.scss';
import { Link } from '@mui/material';


const ActivationSuccess = () => {

    return (

        <div className={cl['activation_success']} >

            <div className={cl['success-message']}>
                <h2>
                    You was successfully registered!!!
                </h2>
                <h2>
                    Now, please check your mailbox to activate your account
                </h2>
            </div>
        </div >
    );
};

export default ActivationSuccess;
