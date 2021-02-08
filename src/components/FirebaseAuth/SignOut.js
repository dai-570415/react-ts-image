import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import firebase from '../../Firebase'
import { AuthContext } from './AuthProvider';
// import Style from './Sign.module.scss';

const SignOut = () => {
    const user = firebase.auth().currentUser;

    const { signout } = useContext(AuthContext);
    const onSignOut = () => {
        signout();
        window.history.pushState(null, null, '/')
    }

    return (
        <>
            {user != null &&
                <button onClick={ onSignOut }>
                    Sign out
                </button>
            }
        </>
    );
}

export default withRouter(SignOut);