import React, {useRef, useState} from 'react';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';

import './styles.css';

require('./App.css');

const App = () => {
    return (
        <div className="appContainer">
            <NavBar />
            <div className="mainWrapper">
                <Main />
            </div>
        </div>
    )
}

export default App;