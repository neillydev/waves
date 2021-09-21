import React, { useEffect, useContext } from 'react';
import LoginModal from './components/LoginModal/LoginModal';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import Upload from './components/Upload/Upload';
import Settings from './components/Settings/Settings';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import ScrollToTop from './util/ScrollToTop';

import { AuthContext, AuthProvider } from './components/contexts/AuthContext';
import { ModalContext, ModalProvider } from './components/contexts/ModalContext';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles.css';
import NotFound from './components/NotFound/NotFound';

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
                localStorage.removeItem('token');
                localStorage.removeItem('username_cache');
                localStorage.removeItem('userid_cache');
                localStorage.removeItem('name_cache');
                localStorage.removeItem('avatar');
                localStorage.removeItem('birthday_cache');
                window.location.reload(false);
            });
    };

    const handleTokenCheck = () => {
        let token = localStorage.getItem('token');

        if (token) {
            handleTokenVerify(token);
        }
        else {
            console.error('No token found!');
            localStorage.removeItem('token');
            localStorage.removeItem('username_cache');
            localStorage.removeItem('userid_cache');
            localStorage.removeItem('name_cache');
            localStorage.removeItem('avatar');
            localStorage.removeItem('birthday_cache');
        }
    };

    useEffect(() => handleTokenCheck(), []);
    
    return (
        <Router>
            <ScrollToTop />
            <div className="appContainer">
                <NavBar />
                <div className="mainWrapper">
                    <Switch>
                        <Route exact path="/">
                            <Main />
                        </Route>
                        <ProtectedRoute exact path="/upload" component={Upload} />
                        <ProtectedRoute exact path="/settings" component={Settings} />
                        <Route exact path='/@:username' component={Profile}>
                            <Profile />
                        </Route>
                        <Route component={NotFound} />
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