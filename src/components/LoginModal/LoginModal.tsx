import React, { useState, useEffect } from 'react';

require('./LoginModal.css');

type LoginModalProps = {
    handleLoginBtn: () => void;
};

const LoginModal = ({ handleLoginBtn }: LoginModalProps) => {
    const [isLoggingIn, useIsLoggingIn] = useState(true);

    return (
        <div className="loginModalContainer">
            <div className="loginModalWrapper flex flex-col">
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
            <div className="loginModalMask" onClick={() => handleLoginBtn()}></div>
        </div>
    )
}

export default LoginModal
