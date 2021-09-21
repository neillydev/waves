import React from 'react';

import TrashSVG from '../../svg/trash.svg';

require('./PostDropdown.css');

const PostDropdown = () => {
    return (
        <div className="postDropdownContainer">
            <div className="postDropdownWrapper">
                <span className="postDropdownItem">
                    <TrashSVG />
                    Delete post
                </span>
            </div>
        </div>
    )
};

export default PostDropdown;
