import React from 'react';

require('./LoadingWave.css');

const LoadingWave = ({ small = false }) => {
    return (
        <div className={`loadingWave ${small ? 'loadingWaveSmall' : ''}`}><div></div><div></div><div></div></div>
    )
};

export default LoadingWave;
