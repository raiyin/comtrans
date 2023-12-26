import styles from './styles.module.scss';
import { Link } from '@mui/material';
import { Navigate } from 'react-router';
import { AuthState } from '../../types/auth';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const ActivationSuccess = () => {

    const authState = useTypedSelector(state => state.authStateReducer.authState);

    return (

        <div className={styles['activation_success']} >

            {authState === AuthState.Loggedin && (
                <Navigate to="/" replace={true} />
            )}
            <div className={styles['success-message']}>
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
