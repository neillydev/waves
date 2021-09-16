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
                        <div className="userControls">
                            <h1>kidfoolish</h1>
                            <div className="editProfile">

                            </div>
                        </div>
                        <ul className="userStats">
                            <li className="userFollowers">
                                <b className="userStat">0</b> followers
                            </li>
                            <li className="userFollowing">
                                <b className="userStat">0</b> following
                            </li>
                            <li className="userPosts">
                                <b className="userStat">0</b> posts
                            </li>
                        </ul>
                        <div className="userBio">

                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
};

export default Profile;
