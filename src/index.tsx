import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ModalContext, ModalProvider } from './components/contexts/ModalContext';
import { AuthContext, AuthProvider } from './components/contexts/AuthContext';
import { EnlargedContext, EnlargedProvider } from './components/contexts/EnlargedContext';


ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <ModalProvider>
                <EnlargedProvider>
                    <App />
                </EnlargedProvider>
            </ModalProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root'));