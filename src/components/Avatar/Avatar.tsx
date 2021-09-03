import React, { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';

require('./Avatar.css');

const Avatar = () => {
    const [dropdownSelected, setDropdownSelected] = useState(false);

    return (
        <div className="avatarContainer" onMouseEnter={(event) => {
            setDropdownSelected(true);
        }
        }
        onMouseLeave={(event) => {
            setDropdownSelected(false)
        }}>
            <span className="avatarWrapper">
                <img src="https://avatars.githubusercontent.com/u/51303046?v=4" />
            </span>
            {dropdownSelected ? <Dropdown /> : null}
        </div>
    )
};

export default Avatar
