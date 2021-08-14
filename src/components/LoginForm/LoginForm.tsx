import React from 'react';

require('./LoginForm.css');

const LoginForm = () => {
    return (
        <div className="loginFormContainer">
            <form>
                <div className="loginTitleContainer">
                    Username
                </div>
                <div className="loginFormWrapper">
                    <input type="text" placeholder="Username" />
                </div>
                <div className="loginTitleContainer">
                    Password
                </div>
                <div className="loginFormWrapper">
                    <input type="text" placeholder="Password" />
                </div>
                <div className="forgot">
                    <a href="/">Forgot password?</a>
                </div>
                <button disabled type="submit" className="loginButton">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm
