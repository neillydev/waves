import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ModalContext, ModalProvider } from './components/contexts/ModalContext';
import { AuthContext, AuthProvider } from './components/contexts/AuthContext';


ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <ModalProvider>
                <App />
            </ModalProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root'));