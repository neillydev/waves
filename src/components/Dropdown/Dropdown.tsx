import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { AuthContext, AuthProvider } from '../contexts/AuthContext';

require('./Dropdown.css');

const Dropdown = () => {
    const { authState, authDispatch } = useContext(AuthContext);

    const username = localStorage.getItem('username_cache');
    const name = localStorage.getItem('name_cache');

    return (
        <div className="dropdownContainer">
            <ul className="dropdownList">
                <li className="dropHeader flex flex-col">
                    <span className="dropdownHeader">{name}</span>
                    <span className="dropdownSubheader">@{username}</span>
                </li>
                <Link to={`${authState ? `/@${username}` : ''}`}>
                    <li className="dropdownItem px-1">
                        Profile
                    </li>
                </Link>
                <li className="dropdownItem px-1">
                    <a href="/">
                        Inbox
                    </a>
                </li>
                <Link to={`${authState ? '/settings' : ''}`}>
                    <li className="dropdownItem px-1">
                        Settings
                    </li>
                </Link>
                <li className="dropdownItem px-1" onClick={() => { localStorage.removeItem('token'); authDispatch({ type: 'false' }); window.location.reload(false); }}>
                    <a href="/">
                        Sign Out
                    </a>
                </li>
            </ul>
        </div>
    )
};

export default Dropdown
