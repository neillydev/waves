import React, { useRef, useState, useReducer, useContext } from 'react';
import LoginModal from './components/LoginModal/LoginModal';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import { ModalContext, ModalProvider } from './components/contexts/ModalContext';

import './styles.css';

require('./App.css');


const App = () => {
    const { state } = useContext(ModalContext);
    /* const handleLoginModal = () => {
        setLoginModalActive(!loginModalActive);
    }; */

    return (
        <div className="appContainer">
            <NavBar isLoggedIn={false} />
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