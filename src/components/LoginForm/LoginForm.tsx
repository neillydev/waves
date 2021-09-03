import React, { useState, useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import {ModalContext} from '../contexts/ModalContext';

require('./LoginForm.css');

const LoginForm = () => {
    const { authDispatch } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);

    const [username, setUsername] = useState<string>();
    const [usernameExists, setUsernameExists] = useState<boolean>();
    const [password, setPassword] = useState<string>();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        fetch(`http://localhost:3000/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(res => {
                if(res){
                    if(res.status == 200){
                        dispatch( { type: 'false' } );
                        authDispatch( { type: 'true' } );
                        res.json().then(json => localStorage.setItem('token', json.token)); //set token in localstorage
                    }
                    else if(res.status == 409){
                        setUsernameExists(false);
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
                <div className="loginFormWrapper">
                    <input type="text" placeholder="Username" onChange={(event) => setUsername(event.currentTarget.value)} required />
                </div>
                <div className="loginTitleContainer">
                    Password
                </div>
                <div className="loginFormWrapper">
                    <input type="text" placeholder="Password" onChange={(event) => setPassword(event.currentTarget.value)} required />
                </div>
                <div className="forgot">
                    <a href="/">Forgot password?</a>
                </div>
                <button type="submit" className="loginButton">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm
