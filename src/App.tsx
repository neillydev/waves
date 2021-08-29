import React, { useRef, useState } from 'react';
import LoginModal from './components/LoginModal/LoginModal';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';

import './styles.css';

require('./App.css');

const App = () => {
    const [loginModalActive, setLoginModalActive] = useState(false);
    
    const handleLoginModal = () => {
        setLoginModalActive(!loginModalActive);
    };

    return (
        <div className="appContainer">
            <NavBar isLoggedIn={false} handleLoginModal={handleLoginModal} />
            <div className="mainWrapper">
                <Main />
            </div>
            {
                loginModalActive ?
                    <LoginModal handleLoginModal={handleLoginModal} />
                    :
                    null
            }
        </div>
    )
}

export default App;