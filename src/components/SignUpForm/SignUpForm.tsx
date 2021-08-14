import React from 'react';

require('./SignUpForm.css');

const SignUpForm = () => {
    return (
        <div className="loginFormContainer">
            <form>
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
                    Email
                </div>
                <div className="loginFormWrapper">
                    <input type="text" placeholder="Email" />
                </div>
                <div className="loginTitleContainer">
                    Password
                </div>
                <div className="loginFormWrapper">
                    <input type="text" placeholder="Password" />
                </div>
                <div className="loginFormWrapper">
                    <input type="text" placeholder="Confirm Password" />
                </div>
                <button disabled type="submit" className="loginButton">
                    Next
                </button>
            </form>
        </div>
    )
}

export default SignUpForm;
