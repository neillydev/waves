import React, { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';

require('./Avatar.css');

const Avatar = () => {
    const [dropdownSelected, setDropdownSelected] = useState(false);
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));

    return (
        <div className="avatarContainer" onMouseEnter={(event) => {
            setDropdownSelected(true);
        }
        }
        onMouseLeave={(event) => {
            setDropdownSelected(false)
        }}>
            <span className="avatarWrapper">
                <img src={`${avatar}`} />
            </span>
            {dropdownSelected ? <Dropdown /> : null}
        </div>
    )
};

export default Avatar
