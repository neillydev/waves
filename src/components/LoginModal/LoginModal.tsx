import React from 'react';

require('./LoginModal.css');

type LoginModalProps = {
    handleLoginBtn: () => void;
    isLogin?: boolean;
};

const LoginModal = ({ handleLoginBtn, isLogin = false }: LoginModalProps) => {
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
                                Sign up for Waves
                            </div>
                        </div>
                    </div>
                </div>
                <div className="loginModalFooter">
                    <div className="loginModalFooterWrapper flex items-center justify-center">
                        <div>
                            Already registered?
                        </div>
                        <a href="/" className="isLoginLink">Log In</a>
                    </div>
                </div>
            </div>
            <div className="loginModalMask" onClick={() => handleLoginBtn()}></div>
        </div>
    )
}

export default LoginModal
