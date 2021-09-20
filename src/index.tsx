import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ModalContext, ModalProvider } from './components/contexts/ModalContext';
import { AuthContext, AuthProvider } from './components/contexts/AuthContext';
import { EnlargedContext, EnlargedProvider } from './components/contexts/EnlargedContext';
import { LoadingContext, LoadingProvider } from './components/contexts/LoadingContext';


ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <ModalProvider>
                <EnlargedProvider>
                    <LoadingProvider>
                        <App />
                    </LoadingProvider>
                </EnlargedProvider>
            </ModalProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root'));