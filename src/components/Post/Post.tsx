import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import WaveSVG from '../../svg/wave.svg';
import BWWaveSVG from '../../svg/bw_wave.svg';
import CommentSVG from '../../svg/comment.svg';
import ShareSVG from '../../svg/share.svg';

require('./Post.css');

type PostProps = {
    post_id: number;
    author: string;
    nickname: string;
    title: string;
    creatorAvatarImg: string;
    contentTitle: string;
    contentDescription: string;
    mediaType: "video" | "image";
    mediaURL: string;
    soundDescription: string;
    mediaDescription: string;
    likes: number;
    comments: number;
};

const Post = ({ post_id, author, nickname, title, creatorAvatarImg, contentTitle, contentDescription, mediaType, mediaURL, soundDescription, mediaDescription, likes, comments }: PostProps) => {

    const [postID, setPostID] = useState(post_id);

    const [postLikes, setPostLikes] = useState(Number(likes));

    const [liked, setLiked] = useState(false);

    const handleFetchLike = () => {
        fetch(`http://localhost:3000/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: postID })
        })
            .then(res => res.status == 200 ? setPostLikes(Number(postLikes) + 1) : null)
            .catch(error => console.error('Error: ' + error));
    };


    const handleCheckIfLiked = () => {
        fetch(`http://localhost:3000/liked`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: postID })
        })
            .then(res => res.json())
            .then((json: any) => {
                setLiked(json.liked);
            })
            .catch(error => console.error('Error: ' + error));
    };

    useEffect(() => {
        handleCheckIfLiked();
    }, [])

    return (
        <div className="postContainer">
            <span className="postWrapper">
                <div className="post">
                    <Link to={`/@${author}`}>
                        <span className="creatorAvatar creatorAvatarImg">
                            <img src={creatorAvatarImg} />
                        </span>
                    </Link>
                    <div className="content">
                        <div className="contentAuthorHeader">
                            <div className="contentHeader">
                                <div className="contentAuthorTitle">
                                    <Link to={`/@${author}`}>
                                        <h2 className="contentAuthorName">
                                            {author}
                                        </h2>
                                    </Link>
                                    <h3 className="contentAuthorNickname">{nickname}</h3>
                                </div>
                                {
                                    localStorage.getItem('username_cache') && author === localStorage.getItem('username_cache') ?
                                        null
                                        :
                                        <div className="followBtnWrapper">
                                            <button className="followBtn">
                                                Follow
                                            </button>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="contentDescription">
                            <h2 className="contentDescriptionText">
                                {contentDescription}
                            </h2>
                        </div>
                        <div className="mediaContainer">
                            <a href="/" className="mediaWrapper">
                                <div className="mediaImg">
                                    <video src={mediaURL.length > 0 ? mediaURL : ''} autoPlay preload="auto" playsInline loop className="media"
                                        onLoadedData={(event) => event.currentTarget.play()}>
                                    </video>
                                </div>
                            </a>
                            <div className="socialControls">
                                <ul className="socialControlList">
                                    <li className="socialControlItem">
                                        <div className="socialWaveIcon" onClick={() => handleFetchLike()}>
                                            {
                                                liked ?
                                                    <WaveSVG />
                                                    :
                                                    <BWWaveSVG />
                                            }
                                        </div>
                                        <h3 className="socialStats">{postLikes}</h3>
                                    </li>
                                    <li className="socialControlItem">
                                        <div className="socialWaveIcon">
                                            <CommentSVG />
                                        </div>
                                        <h3 className="socialStats">{comments}</h3>
                                    </li>
                                    <li className="socialControlItem">
                                        <div className="socialControlItemWrapper">
                                            <div className="socialWaveIcon">
                                                <ShareSVG />
                                            </div>
                                        </div>
                                        <h3 className="socialStats">0</h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="soundDescription">
                            <h2 className="soundDescriptionHeader">
                                {soundDescription}
                            </h2>
                        </div>
                        <div className="mediaDescription">
                            <h2 className="mediaDescriptionText">
                                {mediaDescription}
                            </h2>
                        </div>
                    </div>
                </div>
            </span>
        </div>
    )
};

export default Post;
