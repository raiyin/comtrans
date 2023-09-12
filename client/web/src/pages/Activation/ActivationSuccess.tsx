import cl from './activationsuccess.module.scss';
import { Link } from '@mui/material';


const ActivationSuccess = () => {

    return (

        <div className={cl['activation_success']} >

            <div className={cl['success-message']}>
                <h2>
                    Your account was activated successfully!!!
                </h2>
                <h2>
                    Now, please
                </h2>
                <Link href="/login" variant="h4">
                    Log in.
                </Link>
            </div>
        </div >
    );
};

export default ActivationSuccess;
