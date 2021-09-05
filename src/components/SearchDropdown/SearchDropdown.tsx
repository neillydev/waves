import React, { useState } from 'react';

require('./SearchDropdown.css');

type SearchDropdownProps = {
    username: string | null;
    name: string | null;
    avatar: string | null;
};

const SearchDropdown = ({ username, name, avatar }: SearchDropdownProps) => {

    return (
        <div className="searchDropdownContainer">
            <div className="searchDropdownTitle">
                Creators
            </div>
            <ul className="searchDropdownList">
                {username ? 
                <li className="searchDropdownItem">
                    <span className="searchItemAvatar">
                        <img src={avatar ? avatar : ""} alt="" />
                    </span>
                    <span className="searchItemContent">
                        <p className="searchItemUsername">{username}</p>
                        <p className="searchItemName">{name}</p>
                    </span>
                </li>
                : null}
            </ul>
        </div>
    )
};

export default SearchDropdown;
