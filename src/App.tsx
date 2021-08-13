import React, { useRef, useState } from 'react';
import LoginModal from './components/LoginModal/LoginModal';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';

import './styles.css';

require('./App.css');

const App = () => {
    const [loginModalActive, setLoginModalActive] = useState(false);

    const handleLoginBtn = () => {
        setLoginModalActive(!loginModalActive);
    };

    return (
        <div className="appContainer">
            <NavBar isLoggedIn={false} handleLoginBtn={handleLoginBtn} />
            <div className="mainWrapper">
                <Main />
            </div>
            {
                loginModalActive ?
                    <LoginModal handleLoginBtn={handleLoginBtn} />
                    :
                    null
            }
        </div>
    )
}

export default App;