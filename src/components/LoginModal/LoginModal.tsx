import React, { useState, useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';

require('./LoginModal.css');

type LoginModalProps = {
    handleLoginModal: () => void;
};

const LoginModal = ({ handleLoginModal }: LoginModalProps) => {
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
            <div className="loginModalMask" onClick={() => handleLoginModal()}></div>
        </div>
    )
}

export default LoginModal
