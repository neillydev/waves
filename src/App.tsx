import React, { useEffect, useContext } from 'react';
import LoginModal from './components/LoginModal/LoginModal';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import Upload from './components/Upload/Upload';
import Settings from './components/Settings/Settings';
import Profile from './components/Profile/Profile';

import { AuthContext, AuthProvider } from './components/contexts/AuthContext';
import { ModalContext, ModalProvider } from './components/contexts/ModalContext';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
                    authDispatch({ type: 'true' });
                }
                else if (res.status == 401) {
                    authDispatch({ type: 'false' });
                    localStorage.removeItem('token');
                }
            })
            .catch(error => {
                authDispatch({ type: 'false' });
            });
    };

    const handleTokenCheck = () => {
        let token = localStorage.getItem('token');

        if (token) {
            handleTokenVerify(token);
        }
        else {
            console.error('No token found!')
        }
    };

    useEffect(() => handleTokenCheck(), []);
    return (
        <Router>
            <div className="appContainer">
                <NavBar />
                <div className="mainWrapper">
                    <Switch>
                        <Route exact path="/">
                            <Main />
                        </Route>
                        <Route path="/upload">
                            <Upload />
                        </Route>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <Route path='/@:username' component={Profile}>
                            <Profile />
                        </Route>
                    </Switch>
                </div>
                {
                    state ?
                        <LoginModal />
                        :
                        null
                }
            </div>
        </Router>
    )
}

export default App;