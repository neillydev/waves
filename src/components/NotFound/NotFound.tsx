import React, { useContext } from 'react';

import { LoadingContext } from '../contexts/LoadingContext';

require('./NotFound.css');

const NotFound = () => {
    const { load_state, loading_dispatch } = useContext(LoadingContext);

    loading_dispatch({ loading: true, type: 'bar' });
    return (
        <div className="notFoundContainer">
            <img src="https://i.imgur.com/U3vTGjX.png" alt="" />
            <div className="notFoundInfo">
                <h3 className="notFoundHeader">404</h3>
                <p className="notFoundBody">Oops! Looks like the waves on this page were a little TOO big!</p>
            </div>
        </div>
    )
};

export default NotFound;
