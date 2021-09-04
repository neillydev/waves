import React, { useState } from 'react';

require('./SearchDropdown.css');

type SearchDropdownProps = {
    username: string | undefined;
    name: string | undefined;
    avatar: string | undefined;
};

const SearchDropdown = ({ username, name, avatar }: SearchDropdownProps) => {

    return (
        <div className="searchDropdownContainer">
            <div className="searchDropdownTitle">
                Creators
            </div>
            <ul className="searchDropdownList">
                <li className="searchDropdownItem">
                    <span className="searchItemAvatar">
                        <img src={avatar} alt="" />
                    </span>
                    <span className="searchItemContent">
                        <p className="searchItemUsername">{username}</p>
                        <p className="searchItemName">{name}</p>
                    </span>
                </li>
            </ul>
        </div>
    )
};

export default SearchDropdown;
