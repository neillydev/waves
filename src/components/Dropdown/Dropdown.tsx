import React from 'react'

require('./Dropdown.css');

const Dropdown = () => {
    return (
        <div className="dropdownContainer">
            <ul className="dropdownList">
                <li className="dropHeader flex flex-col">
                    <span className="dropdownHeader">fooli</span>
                    <span className="dropdownSubheader">@kidfoolish</span>
                </li>
            </ul>
        </div>
    )
};

export default Dropdown
