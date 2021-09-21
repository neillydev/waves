import React, { useState, useContext } from 'react';

import LoadingWave from '../LoadingWave/LoadingWave';

import { ModalContext } from '../contexts/ModalContext';
import { LoadingContext } from '../contexts/LoadingContext';

require('./SignUpForm.css');

const SignUpForm = () => {
    //temp state value
    const [loadState, setLoadState] = useState(false);
    const { dispatch } = useContext(ModalContext);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = 31;
    const years = new Date().getFullYear();

    const alphanumeric = /^[0-9a-zA-Z]+$/;

    const [registerSuccessful, setRegisterSuccessful] = useState(false);

    const [monthSelected, setMonthSelected] = useState(false);
    const [daySelected, setDaySelected] = useState(false);
    const [yearSelected, setYearSelected] = useState(false);
    const [month, setMonth] = useState<string>();
    const [day, setDay] = useState<string>();
    const [year, setYear] = useState<string>();
    const [birthdayError, setBirthdayError] = useState<string>('');

    const [username, setUsername] = useState<string>();
    const [usernameError, setUsernameError] = useState<string>('');

    const [email, setEmail] = useState<string>();
    const [emailExists, setEmailExists] = useState<boolean>(false);
    const [emailInvalid, setEmailInvalid] = useState<boolean>(false);

    const [password, setPassword] = useState<string>();
    const [passwordConf, setPasswordConf] = useState<string>();
    const [matchingPass, setMatchingPass] = useState<boolean>(true);

    const handleBirthdayModal = () => {
        setMonthSelected(false);
        setDaySelected(false);
        setYearSelected(false);
    };

    const onEmailInput = (event: React.FormEvent<HTMLInputElement>) => {
        setEmailExists(false);
        setEmailInvalid(false);
        setEmail(event.currentTarget.value);
    };

    const onUsernameInput = (event: React.FormEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value);
    };

    const onPasswordInput = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const onPasswordConfirm = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === password) setMatchingPass(true);
        setPasswordConf(event.currentTarget.value);
    };

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!month || !day || !year) {
            setBirthdayError('Birthday must be set');
            return;
        }
        if (username && (username.length < 4 || username.length > 15)) {
            setUsernameError('Username must be between 4 and 15 characters');
            return;
        }
        if (username && !username.match(alphanumeric)) {
            setUsernameError('Username can only contain letters and numbers');
            return;
        }
        setUsernameError('');
        if (email && (!email.includes('@') || !email.includes('.'))) {
            setEmailInvalid(true);
            return;
        }
        if (password !== passwordConf) {
            setMatchingPass(false);
            return;
        }
        setMatchingPass(true);
        setLoadState(true);
        fetch(`http://localhost:3000/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password, birthday: `${month} ${day}, ${year}` })
        })
            .then(res => {
                if (res.status == 200) {
                    setTimeout(() => dispatch({ type: 'false' }), 300);
                    res.json().then(json => {
                        localStorage.setItem('token', json.token);
                        localStorage.setItem('email_cache', json.user_profile.email);
                        localStorage.setItem('username_cache', json.user_profile.username);
                        localStorage.setItem('userid_cache', json.user_profile.id);
                        localStorage.setItem('name_cache', json.user_profile.name);
                        localStorage.setItem('avatar', json.user_profile.avatar);
                        localStorage.setItem('birthday_cache', json.user_profile.birthday);

                        window.location.reload(false);
                    });
                }
                else if (res.status == 409) {
                    setEmailExists(true);
                    setLoadState(false);
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
                    <div className={`birthdaySelectorContainer ${birthdayError ? 'loginFormError' : null}`} onClick={() => setMonthSelected(true)}>
                        <div className={`birthdaySelector ${month ? 'birthdaySelected' : null}`}>
                            {month ? month : 'Month'}
                        </div>
                        {monthSelected ? <ul className="birthdayListContainer">
                            {months.map(month => <li className="birthdayListItem" onClick={(event) => { event.stopPropagation(); setMonth(month); handleBirthdayModal(); }}>
                                <span>{month}</span>
                            </li>)}
                        </ul> : null}
                    </div>
                    <div className={`birthdaySelectorContainer ${birthdayError ? 'loginFormError' : null}`} onClick={() => setDaySelected(true)}>
                        <div className={`birthdaySelector ${day ? 'birthdaySelected' : null}`}>
                            {day ? day : 'Day'}
                        </div>
                        {daySelected ? <ul className="birthdayListContainer">
                            {[...Array(days)].map((value, i) => <li className="birthdayListItem" onClick={(event) => { event.stopPropagation(); handleBirthdayModal(); setDay(`${i + 1}`); }}><span>{i + 1}</span></li>)}
                        </ul> : null}
                    </div>
                    <div className={`birthdaySelectorContainer ${birthdayError ? 'loginFormError' : null}`} onClick={() => setYearSelected(true)}>
                        <div className={`birthdaySelector ${year ? 'birthdaySelected' : null}`}>
                            {year ? year : 'Year'}
                        </div>
                        {yearSelected ? <ul className="birthdayListContainer">
                            {[...Array(years)].map((value, i) => (years - i >= 1900) ? <li className="birthdayListItem" onClick={(event) => { event.stopPropagation(); setYear(`${years - i}`); handleBirthdayModal(); }}><span>{years - i}</span></li> : null)}
                        </ul> : null}
                    </div>
                </div>
                <div className="loginTitleContainer">
                    Username
                </div>
                <div className={`loginFormWrapper flex flex-col ${usernameError.length > 0 ? 'loginFormError' : ''}`}>
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
                <div className={`loginFormWrapper flex flex-col ${emailExists || emailInvalid ? 'loginFormError' : ''}`}>
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
                <div className={`loginFormWrapper ${matchingPass ? '' : 'loginFormError'}`}>
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
                    {birthdayError.length > 0 ? <h1 className="signUpError">{birthdayError}</h1> : null}
                    {emailInvalid ? <h1 className="signUpError">Email not a valid email</h1> : null}
                    {emailExists ? <h1 className="signUpError">Email already registered</h1> : null}
                    {matchingPass ? null : <h1 className="signUpError">Passwords do not match</h1>}
                    {usernameError.length > 0 ? <h1 className="signUpError">{usernameError}</h1> : null}
                </div>
                {loadState ? <div className="nextLoading"><LoadingWave /></div> : <button type="submit" className="loginButton">
                    Next
                </button>}
            </form>
            {(monthSelected || daySelected || yearSelected) ? <div className="birthdayModalMask" onClick={() => handleBirthdayModal()}></div> : null}
        </div>
    )
}

export default SignUpForm;
