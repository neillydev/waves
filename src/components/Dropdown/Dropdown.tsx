import React, { useContext } from 'react'

import { AuthContext, AuthProvider } from '../contexts/AuthContext';

require('./Dropdown.css');

const Dropdown = () => {
    const { authDispatch } = useContext(AuthContext);

    const username = localStorage.getItem('username_cache');
    const name = localStorage.getItem('name_cache');

    return (
        <div className="dropdownContainer">
            <ul className="dropdownList">
                <li className="dropHeader flex flex-col">
                    <span className="dropdownHeader">{name}</span>
                    <span className="dropdownSubheader">@{username}</span>
                </li>
                <li className="dropdownItem px-1">
                    <a href="/">
                        Profile
                    </a>
                </li>
                <li className="dropdownItem px-1">
                    <a href="/">
                        Inbox
                    </a>
                </li>
                <li className="dropdownItem px-1">
                    <a href="/">
                        Settings
                    </a>
                </li>
                <li className="dropdownItem px-1" onClick={() => { localStorage.removeItem('token'); authDispatch( { type: 'false' } ); } }>
                    <a href="/">
                        Sign Out
                    </a>
                </li>
            </ul>
        </div>
    )
};

export default Dropdown
