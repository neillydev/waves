import React, { useState, useEffect } from 'react';

import BWWaveSVG from '../../svg/bw_wave.svg'; 

require('./Profile.css');

type ProfileProps = {
    profileUsername: string;
};

type PostType = {
    media: string;
    caption: string;
    likes: number;
    date_posted: string;
};

type ProfileType = {
    avatar: string;
    username: string;
    name: string;
    followers: number;
    following: number;
    posts: PostType[];
};

const Profile = ({ profileUsername }: ProfileProps) => {

    const [profile, setProfile] = useState<ProfileType>();

    const [posts, setPosts] = useState<PostType[]>();

    const handleFetchProfile = () => {
        fetch(`http://localhost:3000/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: profileUsername
            })
        })
            .then(res => res.json())
            .then((json: any) => {
                setProfile(json);
            })
            .catch(error => console.error('Error: ' + error));
    };

    useEffect(() => {
        console.log(profileUsername)
        handleFetchProfile();
    }, []);

    return (
        <div className="profileContainer">
            <div className="profileWrapper">
                <header className="profileHeader">
                    <div className="profileAvatar">
                        <img src="https://avatars.githubusercontent.com/u/51303046?v=4" />
                    </div>
                    <div className="profileDetails">
                        <div className="userControls">
                            <h1>{profile?.username}</h1>
                            <div className="editProfile">

                            </div>
                        </div>
                        <ul className="userStats">
                            <li className="userFollowers">
                                <b className="userStat">{profile?.followers}</b> followers
                            </li>
                            <li className="userFollowing">
                                <b className="userStat">{profile?.following}</b> following
                            </li>
                            <li className="userPosts">
                                <b className="userStat">{profile?.posts.length}</b> posts
                            </li>
                        </ul>
                        <div className="userBio">
                            <h1>{profile?.name}</h1>
                            <h2>*+!:) !!🖤& * ^ 🌙* !+ ! * +</h2>
                        </div>
                    </div>
                </header>
                <ul className="profileTabs">
                    <li className="profileTab postsTab profileTabSelected">
                        <span>Posts</span>
                    </li>
                    <li className="profileTab taggedTab">
                        <span>Tagged</span>
                    </li>
                </ul>
                <div className="postsContainer">
                    <div className="postsFeed">
                        <div className="postsItem">
                            <div className="postsItemContent">
                                <div className="postsItemCardWrapper">
                                    <div className="postsItemCard">

                                    </div>
                                </div>
                            </div>
                            <div className="postsItemData">
                                <div className="postsItemCaption">
                                    <h3>we outchea frrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</h3>
                                </div>
                                <div className="postsItemViews">
                                    <div className="viewsIcon">
                                        <BWWaveSVG />
                                        <h3>
                                            729
                                        </h3>
                                    </div>
                                    <h3>9-15-21</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
