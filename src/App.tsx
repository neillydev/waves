import React, {useRef, useState} from 'react';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';

import './styles.css';

const App = () => {
    return (
        <div>
            <NavBar />
            <Main />
        </div>
    )
}

export default App;