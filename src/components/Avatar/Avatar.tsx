import React from 'react';

require('./Avatar.css');

const Avatar = () => {
    return (
        <div className="avatarContainer">
            <span className="avatarWrapper">
                <img src="https://avatars.githubusercontent.com/u/51303046?v=4" />
            </span>
        </div>
    )
};

export default Avatar
