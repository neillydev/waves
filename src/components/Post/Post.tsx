import React, { useContext, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';

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

    const { authState } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);

    const [postID, setPostID] = useState(post_id);

    const [postLikes, setPostLikes] = useState(Number(likes));

    const [liked, setLiked] = useState(false);

    const [followed, setFollowed] = useState(false);

    const [postClicked, setPostClicked] = useState<Number>();

    const handleFetchFollow = () => {
        fetch(`http://localhost:3000/follow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), username: localStorage.getItem("username_cache"), following_username: author })
        })
            .then(res => {
                if (res.status == 200) {
                    setFollowed(followed ? false : true);
                }
                else if (res.status == 409) {
                    window.location.reload(false);
                }
            })
            .catch(error => console.error('Error: ' + error));
    };

    const handleFetchLike = () => {
        fetch(`http://localhost:3000/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: postID })
        })
            .then(res => {
                if (res.status == 200) {
                    setPostLikes(Number(postLikes) + 1);
                    setLiked(true);
                }
                else if (res.status == 409) {
                    window.location.reload(false);
                }
            })
            .catch(error => console.error('Error: ' + error));
    };

    const handleCheckIfFollowing = () => {
        fetch(`http://localhost:3000/following`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), following_username: author })
        })
            .then(res => {
                if (res.status == 200) {
                    res.json().then((json: any) => {
                        console.log(json.following)
                        setFollowed(json.following);
                    });
                }
                else if (res.status == 409) {
                    window.location.reload(false);
                }
            })

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
        if (authState) {
            handleCheckIfLiked();
            handleCheckIfFollowing();
        }
    }, [])

    return (
        <div className="postContainer" onClick={() => setPostClicked(postID)}>
            {
                postClicked ?
                    <div className="postLargeContainer">
                        <div className="postLargeVideoContainer">
                            <div className="postLargeVideoWrapper">
                                <video src={mediaURL} autoPlay preload="auto" playsInline loop className="largeMedia"></video>
                            </div>
                        </div>
                        <div className="postLargeSocialContainer">
                            <div className="postLargeAuthor">
                                <div className="postLargeAuthorWrapper">
                                    <div className="postLargeAuthorInfo">
                                        <Link to={`/@${author}`}>
                                            <span className="creatorAvatar creatorAvatarImg">
                                                <img src={creatorAvatarImg} />
                                            </span>
                                        </Link>
                                        <div className="contentAuthorTitle contentAuthorLarge">
                                            <Link to={`/@${author}`}>
                                                <h2 className="contentAuthorName">
                                                    {author}
                                                </h2>
                                            </Link>
                                            <h3 className="contentAuthorNickname">{nickname}</h3>
                                        </div>
                                    </div>
                                    {
                                        localStorage.getItem('username_cache') && author === localStorage.getItem('username_cache') ?
                                            null
                                            :
                                            <div className="followBtnWrapper">
                                                <button className="followBtn" onClick={authState ? () => handleFetchFollow() : () => dispatch({ type: 'true' })}>
                                                    {followed ? "Following" : "Follow"}
                                                </button>
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="postLargeDesc">
                                <h1 className="postLargeCaption">{contentDescription}</h1>
                                <h1 className="postLargeSoundDesc">{soundDescription}</h1>
                                <div className="postSocialControls">
                                    <div className="leftControls">
                                        <div className="controlItem">
                                            <span className="socialWaveIcon controlIcon likeIcon">
                                                {
                                                    liked ?
                                                        <WaveSVG />
                                                        :
                                                        <BWWaveSVG />
                                                }
                                            </span>
                                            <h3 className="socialStats controlStats">{postLikes}</h3>
                                        </div>
                                        <div className="controlItem">
                                            <span className="socialWaveIcon controlIcon likeIcon">
                                                <CommentSVG />
                                            </span>
                                            <h3 className="socialStats controlStats">0</h3>
                                        </div>
                                    </div>
                                    <div className="rightControls">

                                    </div>
                                </div>
                            </div>
                            <div className="postLargeCommentContainer">

                            </div>
                            <div className="postLargeCommentingContainer">

                            </div>
                        </div>
                    </div>
                    :
                    null
            }
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
                                            <button className="followBtn" onClick={authState ? () => handleFetchFollow() : () => dispatch({ type: 'true' })}>
                                                {followed ? "Following" : "Follow"}
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
                                        <div className="socialWaveIcon" onClick={() => authState ? handleFetchLike() : dispatch({ type: 'true' })}>
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
