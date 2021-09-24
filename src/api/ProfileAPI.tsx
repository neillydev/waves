import React from 'react';

export const handleFetchProfile = () => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: location.pathname.split('@')[1]
            })
        })
            .then(res => res.json())
            .then((json: any) => {
                resolve(json);
            })
            .catch(error => console.error('Error: ' + error));
    });
};