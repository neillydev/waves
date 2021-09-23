import React, { useState, useEffect, useContext } from 'react';

import { LoadingContext } from '../contexts/LoadingContext';

import { useLocation } from 'react-router-dom';

import BWWaveSVG from '../../svg/bw_wave.svg';
import SkeletonProfile from '../Skeleton/SkeletonProfile';

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
    avatar: string | undefined;
    username: string;
    name: string;
    followers: number;
    following: number;
    posts: PostType[];
};

const Profile = () => {
    const location = useLocation();

    const { load_state, loading_dispatch } = useContext(LoadingContext);

    const [profile, setProfile] = useState<ProfileType>();

    const [posts, setPosts] = useState<PostType[]>();

    const handleFetchProfile = () => {
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
                setProfile(json);
                setTimeout(() => {
                    loading_dispatch({ loading: true, type: 'bar' });
                }, 200);
            })
            .catch(error => console.error('Error: ' + error));
    };

    useEffect(() => {
        loading_dispatch({ loading: true, type: 'loading_bar' });
        handleFetchProfile();
    }, [location.pathname]);

    return (
        <>
        {
            load_state !== 'bar' ?
                <SkeletonProfile />
                :
                <div className="profileContainer">
                    <div className="profileWrapper">
                        <header className="profileHeader">
                            <div className="profileAvatar">
                                <img src={profile?.avatar ? profile.avatar : (localStorage.getItem('avatar') || '')} />
                            </div>
                            <div className="profileDetails">
                                <div className="userControls">
                                    <h1>{profile?.username}</h1>
                                    <div className="editProfile">

                                    </div>
                                </div>
                                <ul className="userStats">
                                    <li className="userFollowers">
                                        <b className="userStat">{profile?.followers || 0}</b> followers
                                    </li>
                                    <li className="userFollowing">
                                        <b className="userStat">{profile?.following || 0}</b> following
                                    </li>
                                    <li className="userPosts">
                                        <b className="userStat">{profile?.posts?.length || 0}</b> posts
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
                                {profile?.posts ? profile?.posts.map(post => (
                                    <div className="postsItem">
                                        <div className="postsItemContent">
                                            <div className="postsItemCardWrapper">
                                                <div className="postsItemCard">
                                                    <video src={post.media} autoPlay preload="auto" playsInline loop className="postsItemVideo"></video>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="postsItemData">
                                            <div className="postsItemCaption">
                                                <h3>{post.caption}</h3>
                                            </div>
                                            <div className="postsItemViews">
                                                <div className="viewsIcon">
                                                    <BWWaveSVG />
                                                    <h3>
                                                        {post.likes}
                                                    </h3>
                                                </div>
                                                <h3>{post.date_posted}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )) : null}
                            </div>
                        </div>
                    </div>
                </div>
        }
        </>
    );
};

export default Profile;
