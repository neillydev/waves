import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import SkeletonSearch from '../Skeleton/SkeletonSearch';

require('./SearchDropdown.css');

type SearchDropdownProps = {
    username: string | null;
    name: string | null;
    avatar: string | null;
    handleSearchTyping: (searchTyping: boolean) => void;
};

const SearchDropdown = ({ username, name, avatar, handleSearchTyping }: SearchDropdownProps) => {

    return (
        <div className="searchDropdownContainer">
            <div className="searchDropdownTitle">
                Creators
            </div>
            <ul className="searchDropdownList">
                {username ?
                    <Link to={`/@${username}`} onClick={() => handleSearchTyping(false)}>
                        <li className="searchDropdownItem">
                            <span className="searchItemAvatar">
                                <img src={avatar ? avatar : ""} alt="" />
                            </span>
                            <span className="searchItemContent">
                                <p className="searchItemUsername">{username}</p>
                                <p className="searchItemName">{name}</p>
                            </span>
                        </li>
                    </Link>
                    : <SkeletonSearch />}
            </ul>
        </div >
    )
};

export default SearchDropdown;
