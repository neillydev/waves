import React, { useEffect, useContext } from 'react';
import LoginModal from './components/LoginModal/LoginModal';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import { AuthContext, AuthProvider } from './components/contexts/AuthContext';
import { ModalContext, ModalProvider } from './components/contexts/ModalContext';

import './styles.css';

require('./App.css');


const App = () => {
    const { authState, authDispatch } = useContext(AuthContext);
    const { state } = useContext(ModalContext);

    const handleTokenVerify = (token: string) => {
        fetch(`http://localhost:3000/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        })
        .then(res => {
            if (res.status == 200) {
                authDispatch( { type: 'true' } );
            }
            else if (res.status == 401) {
                authDispatch( { type: 'false' } );
                localStorage.removeItem('token');
            }
        })
        .catch(error => {
            authDispatch( { type: 'false' } );
        });
    };

    const handleTokenCheck = () => {
        let token = localStorage.getItem('token');

        if (token) {
            handleTokenVerify(token);
        }
        else{
            console.error('No token found!')
        }
    };

    useEffect(() => handleTokenCheck(), []);

    return (
        <div className="appContainer">
            <NavBar />
            <div className="mainWrapper">
                <Main />
            </div>
            {
                state ?
                    <LoginModal />
                    :
                    null
            }
        </div>
    )
}

export default App;