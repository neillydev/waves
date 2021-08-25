import React, { useState }  from 'react';

require('./SignUpForm.css');

const SignUpForm = () => {

    const [registerSuccessful, setRegisterSuccessful] = useState(false);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    const onEmailInput = (event: React.FormEvent<HTMLInputElement>) => {
        
    };

    const onUsernameInput = (event: React.FormEvent<HTMLInputElement>) => {
        
    };

    const onPasswordInput = (event: React.FormEvent<HTMLInputElement>) => {
        
    };

    const handleRegister = () => { 
        fetch(`http://localhost:3000/register?${username}&${email}&${password}`)
            .then(() => {
            })
            .catch(() => {

            })
    };


    return (
        <div className="loginFormContainer">
            <form onSubmit={() => handleRegister()}>
                <div className="loginTitleContainer">
                    Birthday
                </div>
                <div className="birthdayContainer w-full flex justify-between">
                    <div className="birthdaySelectorContainer">
                        <div className="birthdaySelector">
                            Month
                        </div>
                    </div>
                    <div className="birthdaySelectorContainer">
                        <div className="birthdaySelector">
                            Day
                        </div>
                    </div>
                    <div className="birthdaySelectorContainer">
                        <div className="birthdaySelector">
                            Year
                        </div>
                    </div>
                </div>
                <div className="loginTitleContainer">
                    Username
                </div>
                <div className="loginFormWrapper">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        onChange={() => onUsernameInput}
                        required
                    />
                </div>
                <div className="loginTitleContainer">
                    Email
                </div>
                <div className="loginFormWrapper">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        onChange={() => onEmailInput}
                        required
                    />
                </div>
                <div className="loginTitleContainer">
                    Password
                </div>
                <div className="loginFormWrapper">
                    <input 
                        type="text"
                        placeholder="Password"
                        onChange={() => onPasswordInput}
                        required
                    />
                </div>
                <div className="loginFormWrapper">
                    <input type="text" placeholder="Confirm Password" />
                </div>
                <button type="submit" className="loginButton">
                    Next
                </button>
            </form>
        </div>
    )
}

export default SignUpForm;
