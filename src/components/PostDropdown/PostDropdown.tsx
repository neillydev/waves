import React, { useState, useContext } from 'react';

import TrashSVG from '../../svg/trash.svg';

require('./PostDropdown.css');

type PostDropdownProps = {
    handleDeletePost: () => void;
};

const PostDropdown = ({ handleDeletePost }: PostDropdownProps) => {

    return (
        <div className="postDropdownContainer">
            <div className="postDropdownWrapper">
                <span className="postDropdownItem" onClick={() => {
                    handleDeletePost();
                }}>
                    <TrashSVG />
                    Delete post
                </span>
            </div>
        </div>
    )
};

export default PostDropdown;
