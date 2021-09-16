import React, { useState } from 'react';

require('./Profile.css');

type ProfileProps = {

};

const Profile = () => {
    return (
        <div className="profileContainer">
            <div className="profileWrapper">
                <header className="profileHeader">
                    <div className="profileAvatar">
                        <img src="https://avatars.githubusercontent.com/u/51303046?v=4" />
                    </div>
                    <div className="profileDetails">

                    </div>
                </header>
            </div>
        </div>
    )
};

export default Profile;
