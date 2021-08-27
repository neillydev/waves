import React, { useState }  from 'react';

require('./SignUpForm.css');

const SignUpForm = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = 31;
    const years = new Date().getFullYear();

    const [registerSuccessful, setRegisterSuccessful] = useState(false);

    const [monthSelected, setMonthSelected] = useState(false);
    const [daySelected, setDaySelected] = useState(false);
    const [yearSelected, setYearSelected] = useState(false);

    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [emailExists, setEmailExists] = useState<boolean>(false);
    const [password, setPassword] = useState<string>();
    const [passwordConf, setPasswordConf] = useState<string>();
    const [matchingPass, setMatchingPass] = useState<boolean>(true);

    const handleBirthdayModal = () => {
        setMonthSelected(false);
        setDaySelected(false);
        setYearSelected(false);
    };
    
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

    const onPasswordConfirm = (event: React.FormEvent<HTMLInputElement>) => {
        setPasswordConf(event.currentTarget.value);
    };

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        if(password !== passwordConf) {
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
            .then(res => {
                if(res.status == 201){

                }
                else if(res.status == 409){
                    setEmailExists(true);
                }
            })
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
                    <div className="birthdaySelectorContainer" onClick={() => setMonthSelected(true)}>
                        <div className="birthdaySelector">
                            Month
                        </div>
                        {monthSelected ? <ul className="birthdayListContainer">
                            {months.map(month => <li className="birthdayListItem">
                                <span>{month}</span>
                            </li>)}
                        </ul> : null}
                    </div>
                    <div className="birthdaySelectorContainer" onClick={() => setDaySelected(true)}>
                        <div className="birthdaySelector">
                            Day
                        </div>
                        {daySelected ? <ul className="birthdayListContainer">
                            {[...Array(days)].map((value, i) => <li className="birthdayListItem"><span>{i+1}</span></li>)}
                        </ul> : null}
                    </div>
                    <div className="birthdaySelectorContainer" onClick={() => setYearSelected(true)}>
                        <div className="birthdaySelector">
                            Year
                        </div>
                        {yearSelected ? <ul className="birthdayListContainer">
                            {[...Array(years)].map((value, i) => (years-i >= 1900) ? <li className="birthdayListItem"><span>{years-i}</span></li> : null)}
                        </ul> : null}
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
                <div className={`loginFormWrapper flex flex-col ${emailExists ? 'loginFormError' : ''}`}>
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
                <div className={`loginFormWrapper flex flex-col ${matchingPass ? '' : 'loginFormError'}`}>
                    <input 
                        type="text" 
                        placeholder="Confirm Password"
                        onChange={onPasswordConfirm}
                        required
                    />
                    {emailExists ? <h1 className="confirmPass">Email already registered</h1> : null}
                    {matchingPass ? null : <h1 className="confirmPass">Passwords do not match</h1>}
                </div>
                <button type="submit" className="loginButton">
                    Next
                </button>
            </form>
            {(monthSelected || daySelected || yearSelected) ? <div className="birthdayModalMask" onClick={() => handleBirthdayModal()}></div> : null}
        </div>
    )
}

export default SignUpForm;
