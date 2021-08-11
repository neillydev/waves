import React, { useRef, useState } from 'react';
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
                    <div className="loginModalContainer">
                        <div className="loginModalWrapper">
                            <div>
                                <img className="loginModalClose">

                                </img>
                            </div>
                        </div>
                        <div className="loginModalMask" onClick={()=>handleLoginBtn()}></div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default App;