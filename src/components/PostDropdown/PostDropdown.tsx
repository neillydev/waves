import React, { useState, useContext } from 'react';

import { LoadingContext } from '../contexts/LoadingContext';

import { handleDeletePost } from '../../api/PostAPI';

import TrashSVG from '../../svg/trash.svg';

require('./PostDropdown.css');

type PostDropdownProps = {
    post_id: number;
    handleLoadState: (loadState: boolean) => void;
};

const PostDropdown = ({ post_id, handleLoadState }: PostDropdownProps) => {
    const { load_state, loading_dispatch } = useContext(LoadingContext);
    return (
        <div className="postDropdownContainer">
            <div className="postDropdownWrapper">
                <span className="postDropdownItem" onClick={() => {
                    loading_dispatch({ loading: true, type: 'loading_bar' });
                    handleLoadState(true);
                    handleDeletePost(post_id).then(() => {
                        handleLoadState(false);
                        loading_dispatch({ loading: true, type: 'bar' });
                    }).catch(() => loading_dispatch({ loading: true, type: 'bar' }));

                }}>
                    <TrashSVG />
                    Delete post
                </span>
            </div>
        </div>
    )
};

export default PostDropdown;
