import React, { useState }  from 'react';

require('./SignUpForm.css');

const SignUpForm = () => {

    const [registerSuccessful, setRegisterSuccessful] = useState(false);
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [matchingPass, setMatchingPass] = useState<boolean>(true);
    
    const onEmailInput = (event: React.FormEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        setEmail(event.currentTarget.value);
    };

    const onUsernameInput = (event: React.FormEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value);
    };

    const onPasswordInput = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        if(event.currentTarget.value !== password){
            setMatchingPass(false);
            return;
        }
        setMatchingPass(true);
        fetch(`http://localhost:3000/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username, password })
            })
            .then(res => res.json())
            .then(response => console.log('Success: ', response))
            .catch(error => console.error('Error: ', error));
    };


    return (
        <div className="loginFormContainer">
            <form onSubmit={handleRegister}>
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
                        onChange={onUsernameInput}
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
                        onChange={onEmailInput}
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
                        onChange={onPasswordInput}
                        required
                    />
                </div>
                <div className="loginFormWrapper">
                    <input 
                        type="text" 
                        placeholder="Confirm Password"
                        required
                    />
                    {matchingPass ? null : <h1>Password does not match!</h1>}
                </div>
                <button type="submit" className="loginButton">
                    Next
                </button>
            </form>
        </div>
    )
}

export default SignUpForm;
