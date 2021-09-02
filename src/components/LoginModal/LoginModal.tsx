import React, { useState, useEffect, useContext } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';

import {ModalContext} from '../contexts/ModalContext';

require('./LoginModal.css');

const LoginModal = () => {
    const { dispatch } = useContext(ModalContext);

    const [isLoggingIn, useIsLoggingIn] = useState(true);

    return (
        <div className="loginModalContainer">
            <div className={`loginModalWrapper ${ isLoggingIn ? '' : 'loginModalWrapper-signUp' } flex flex-col`}>
                <div className="loginModalHeader w-full">
                    <img className="loginModalClose">

                    </img>
                </div>
                <div className="loginModalBody">
                    <div className="loginBody">
                        <div className="loginContainer">
                            <div className="loginTitle">
                                {isLoggingIn ? "Login to Waves" : "Sign up for Waves" }
                            </div>
                        </div>
                        {isLoggingIn ? 
                        <LoginForm></LoginForm>
                        : 
                        <SignUpForm></SignUpForm>
                        }
                    </div>
                </div>
                <div className="loginModalFooter">
                    <div className="loginModalFooterWrapper flex items-center justify-center">
                        <div>
                            {isLoggingIn ? "Don't have an account?" : "Already registered?" }
                        </div>
                        <button className="isLoginLink" onClick={()=>useIsLoggingIn(!isLoggingIn)}>{isLoggingIn ? "Sign Up" : "Log In"}</button>
                    </div>
                </div>
            </div>
            <div className="loginModalMask" onClick={() => dispatch( { type: 'false' } )}></div>
        </div>
    )
}

export default LoginModal
