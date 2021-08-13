import React from 'react';

require('./LoginModal.css');

type LoginModalProps = {
    handleLoginBtn: () => void;
};

const LoginModal = ({ handleLoginBtn }: LoginModalProps) => {
    return (
        <div className="loginModalContainer">
            <div className="loginModalWrapper">
                <div>
                    <img className="loginModalClose">

                    </img>
                </div>
            </div>
            <div className="loginModalMask" onClick={() => handleLoginBtn()}></div>
        </div>
    )
}

export default LoginModal
