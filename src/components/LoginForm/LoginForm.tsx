import React, { useState, useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import LoadingWave from '../LoadingWave/LoadingWave';

require('./LoginForm.css');

const LoginForm = () => {
    const [loadState, setLoadState] = useState(false);
    const { authDispatch } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);

    const [username, setUsername] = useState<string>();
    const [loginError, setLoginError] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadState(true);
        fetch(`http://localhost:3000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => {
                if (res) {
                    if (res.status == 200) {
                        dispatch({ type: 'false' });
                        authDispatch({ type: 'true' });
                        res.json().then(json => {
                            localStorage.setItem('token', json.token);
                            localStorage.setItem('email_cache', json.user_profile.email);
                            localStorage.setItem('username_cache', json.user_profile.username);
                            localStorage.setItem('userid_cache', json.user_profile.id);
                            localStorage.setItem('name_cache', json.user_profile.name);
                            localStorage.setItem('avatar', json.user_profile.avatar);
                            localStorage.setItem('birthday_cache', json.user_profile.birthday);

                            window.location.reload(false);
                        });
                    }
                    else if (res.status === 409) {
                        setLoginError('Username or password is invalid');
                        setLoadState(false);
                    }
                    else if (res.status === 400) {
                        setLoginError('Unknown error occurred. Please try again.');
                        setLoadState(false);
                    }
                }
            })
            .then(response => console.log('Success: ', response))
            .catch(error => console.error('Error: ', error));
    };

    return (
        <div className="loginFormContainer">
            <form onSubmit={handleLogin}>
                <div className="loginTitleContainer">
                    Username
                </div>
                <div className={`loginFormWrapper ${loginError ? 'loginFormError' : ''}`}>
                    <input type="text" placeholder="Username" onChange={(event) => {
                        setLoginError(undefined);
                        setUsername(event.currentTarget.value)
                    }
                    } required />
                </div>
                <div className="loginTitleContainer">
                    Password
                </div>
                <div className={`loginFormWrapper ${loginError ? 'loginFormError' : ''}`}>
                    <input type="text" placeholder="Password" onChange={(event) => {
                        setLoginError(undefined);
                        setPassword(event.currentTarget.value)
                    }
                    } required />
                </div>
                <div className="forgot">
                    <a href="/">Forgot password?</a>
                </div>
                {!loginError ? null : <h1 className="signUpError">Username or password is invalid</h1>}
                {loadState ? <div className="nextLoading"><LoadingWave /></div> : <button type="submit" className="loginButton">
                    Login
                </button>}

            </form>
        </div>
    )
}

export default LoginForm
