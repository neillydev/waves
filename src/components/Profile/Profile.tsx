import React, { useState, useEffect, useContext, useRef } from 'react';

import PostDropdown from '../PostDropdown/PostDropdown';
import EnlargedPost from '../EnlargedPost/EnlargedPost';

import { EnlargedContext } from '../contexts/EnlargedContext';
import { LoadingContext } from '../contexts/LoadingContext';

import { handleFetchProfile } from '../../api/ProfileAPI';

import { useLocation } from 'react-router-dom';

import BWWaveSVG from '../../svg/bw_wave.svg';
import SkeletonProfile from '../Skeleton/SkeletonProfile';
import { handleCheckIfLiked } from '../../api/PostAPI';

require('./Profile.css');

type ProfileProps = {
    profileUsername: string;
};

type PostType = {
    verified: boolean;
    post_id: number;
    avatar: string;
    username: string;
    name: string;
    media: string;
    caption: string;
    soundDescription: string;
    likes: number;
    comments: any;
    date_posted: string;
};

type ProfileType = {
    user_id: number | undefined;
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
    const { enlarge_dispatch } = useContext(EnlargedContext);

    const [profile, setProfile] = useState<ProfileType>();
    const [postClicked, setPostClicked] = useState<PostType>();

    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePostClicked = (postClickedNumber: number | undefined) => {
        setPostClicked(undefined);
    };

    useEffect(() => {
        enlarge_dispatch({ type: 'false' });
        loading_dispatch({ loading: true, type: 'loading_bar' });
        handleFetchProfile().then((json: any) => {
            setProfile(json)
            setTimeout(() => {
                loading_dispatch({ loading: true, type: 'bar' });
            }, 200);
        });
    }, [location.pathname]);

    return (
        <>
            {
                load_state !== 'bar' ?
                    <SkeletonProfile />
                    :
                    (
                        postClicked ? <EnlargedPost key={postClicked.post_id}
                            verified={postClicked.verified}
                            post_id={postClicked.post_id}
                            username={postClicked.username}
                            name={profile?.name || ''}
                            title={postClicked.caption}
                            creatorAvatarImg={profile?.avatar || ''}
                            contentTitle={postClicked.caption}
                            contentDescription={postClicked.caption}
                            mediaType={"video"}
                            mediaURL={postClicked.media}
                            soundDescription={postClicked.soundDescription}
                            mediaDescription={postClicked.date_posted}
                            likes={postClicked.likes}
                            comments={postClicked.comments}
                            handlePostClicked={handlePostClicked}
                             />
                            :
                            < div className="profileContainer" >
                                <div className="profileWrapper">
                                    <header className="profileHeader">
                                        <div className="profileAvatar">
                                            <img src={profile?.avatar ? profile.avatar : ''} />
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
                                                                <video ref={videoRef} src={post.media} autoPlay preload="auto" playsInline loop className="postsItemVideo" onClick={(event) => {
                                                                    event.preventDefault();
                                                                    setPostClicked(post);
                                                                    videoRef.current?.pause();
                                                                    enlarge_dispatch({ type: 'true' });
                                                                }}></video>
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
                    )
            }
        </>
    );
};

export default Profile;
