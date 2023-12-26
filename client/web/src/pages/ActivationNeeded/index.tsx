import { Navigate } from 'react-router';
import styles from './styles.module.scss';
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
