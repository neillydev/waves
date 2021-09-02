import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ModalContext, ModalProvider } from './components/contexts/ModalContext';


ReactDOM.render(
    <BrowserRouter>
        <ModalProvider>
            <App />
        </ModalProvider>
    </BrowserRouter>, 
    document.getElementById('root'));