import React from 'react';

require('./SearchDropdown.css');

const SearchDropdown = () => {
    return (
        <div className="searchDropdownContainer">
            <div className="searchDropdownTitle">
                Creators
            </div>
            <ul className="searchDropdownList">
                <li className="searchDropdownItem">
                    <span className="searchItemAvatar">
                        <img src="" alt="" />
                    </span>
                    <span className="searchItemContent">
                        <p className="searchItemUsername">kidfoolish</p>
                        <p className="searchItemName">fooli</p>
                    </span>
                </li>
            </ul>
        </div>
    )
};

export default SearchDropdown;
