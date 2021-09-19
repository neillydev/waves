import React, { useContext, useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import { EnlargedContext } from '../contexts/EnlargedContext';

import WaveSVG from '../../svg/wave.svg';
import BWWaveSVG from '../../svg/bw_wave.svg';
import CommentSVG from '../../svg/comment.svg';
import ShareSVG from '../../svg/share.svg';
import CancelSVG from '../../svg/cancel.svg';

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
    comments: any;
};

const Post = ({ post_id, author, nickname, title, creatorAvatarImg, contentTitle, contentDescription, mediaType, mediaURL, soundDescription, mediaDescription, likes, comments }: PostProps) => {

    const { authState } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);
    const { enlarge_dispatch } = useContext(EnlargedContext);

    const [postID, setPostID] = useState(post_id);

    const [postLikes, setPostLikes] = useState(Number(likes));

    const [liked, setLiked] = useState(false);
    const [commentLiked, setCommentLiked] = useState<number[]>([]);

    const [followed, setFollowed] = useState(false);

    const [postClicked, setPostClicked] = useState<Number>();

    const [comment, setComment] = useState<string>('');
    const [postComments, setPostComments] = useState<any>(comments);

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

    const handleFetchLike = (comment_like: boolean, comment_id?: number) => {
        fetch(`http://localhost:3000/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: comment_like ? comment_id : postID, comment_like: comment_like })
        })
            .then(res => {
                if (res.status == 200) {

                    res.json().then((json: any) => {
                        if (json.comment_like) {
                            if (commentLiked.includes(json.post_id) === false) {
                                setCommentLiked(oldCommentLiked => [...oldCommentLiked, json.post_id]);
                            }
                            else {
                                setCommentLiked(oldCommentLiked => [...oldCommentLiked.splice(oldCommentLiked.findIndex((commentID) => commentID === comment_id), 1)]);
                            }
                            handleUpdateLike(json.post_id, json.likes);
                        }
                        else {
                            setPostLikes(json.likes);
                            setLiked(!liked);
                        }
                    });
                }
                else if (res.status == 409) {
                    window.location.reload(false);
                }
            })
            .catch(error => console.error('Error: ' + error));
    };

    const handleUpdateLike = (comment_id: number, likes: number) => {
        let tmpPostComments = postComments;
        let item = {
            ...tmpPostComments[tmpPostComments.findIndex((comment: any) => comment.comment_id === comment_id)],
            likes: Number(likes)
        }
        tmpPostComments[tmpPostComments.findIndex((comment: any) => comment.comment_id === comment_id)] = item;
        setPostComments([...tmpPostComments]);
    }

    const handlePostComment = () => {
        if (comment) {
            const saveComment = comment;

            setComment('');

            fetch(`http://localhost:3000/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: postID, comment: saveComment })
            })
                .then(res => {
                    if (res.status == 200) {
                        res.json().then((json: any) => {
                            setPostComments([...postComments, json]);
                        });
                    }
                    else if (res.status == 409) {
                        window.location.reload(false);
                    }
                })
                .catch(error => console.error('Error: ' + error));
        }
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
                        setFollowed(json.following);
                    });
                }
                else if (res.status == 409) {
                    window.location.reload(false);
                }
            })

            .catch(error => console.error('Error: ' + error));
    };

    const handleCheckIfLiked = (comment_id?: number) => {
        fetch(`http://localhost:3000/liked`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: comment_id ? comment_id : postID })
        })
            .then(res => res.json())
            .then((json: any) => {
                if (json.comment_like === true) {
                    setCommentLiked([...commentLiked, json.post_id]);
                }
                else {
                    if (json.post_id.toString().length < 17) {
                        //temp solution. need to fix where you're returning comment_like boolean, as it's undefined always, causing comments to register...
                        //...as a post and therefore forcing posts to become unliked, as a result of the comment not being liked
                        setLiked(json.liked);
                    }
                }
            })
            .catch(error => console.error('Error: ' + error));
    };

    useEffect(() => {
        if (authState) {
            handleCheckIfLiked();
            postComments.map((comment: any) => {
                handleCheckIfLiked(comment.comment_id);
            });
            handleCheckIfFollowing();
        }
    }, [])

    return (
        <div className="postContainer">
            {
                postClicked ?
                    <div className="postLargeContainer">
                        <div className="postLargeVideoContainer">
                            <div className="postLargeVideoWrapper">
                                <video src={mediaURL} autoPlay preload="auto" playsInline loop className="largeMedia"></video>
                            </div>
                        </div>
                        <CancelSVG onClick={() => {
                            enlarge_dispatch({ type: 'false' });
                            setPostClicked(undefined);
                        }} />
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
                                            <span className="socialWaveIcon controlIcon likeIcon" onClick={() => authState ? handleFetchLike(false) : dispatch({ type: 'true' })}>
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
                                            <h3 className="socialStats controlStats">{postComments.length}</h3>
                                        </div>
                                    </div>
                                    <div className="rightControls">

                                    </div>
                                </div>
                            </div>
                            <div className="postLargeCommentContainer">
                                <div className="enlargedComments">

                                    {postComments ? postComments.map((comment: any) =>

                                        <div className="commentItem">
                                            <div className="commentItemContent">
                                                <Link to={`/@${comment.user_profile.username}`}>
                                                    <span className="creatorAvatar creatorAvatarImg commentAvatar">
                                                        <img src={comment.user_profile.avatar} />
                                                    </span>
                                                </Link>
                                                <div className="commentItemContentContainer">
                                                    <Link to={`/@${comment.user_profile.username}`}>
                                                        <h2 className="contentAuthorName">
                                                            {comment.user_profile.username}
                                                        </h2>
                                                    </Link>
                                                    <p className="commentText">
                                                        <span>{comment.comment}</span>
                                                        <div className="commentFooter">
                                                            <span className="commentTime">
                                                                3d ago
                                                            </span>
                                                            <span className="commentReplyBtn">
                                                                Reply
                                                            </span>
                                                        </div>
                                                    </p>
                                                </div>
                                                <div className="commentLikesContainer" onClick={() => {
                                                    handleFetchLike(true, comment.comment_id);
                                                }}>
                                                    {
                                                        commentLiked.includes(comment.comment_id) === true ?
                                                            <WaveSVG />
                                                            :
                                                            <BWWaveSVG />
                                                    }
                                                    <span className="commentLikes">
                                                        {Number(comment.likes) || 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>) : null}
                                </div>
                            </div>
                            <div className="postLargeFormContainer">
                                <form className="postLargeFormWrapper" action="" onSubmit={(event) => {
                                    event.preventDefault();
                                    handlePostComment()
                                }
                                }>
                                    <input value={comment} type="text" className="enlargedInputForm" placeholder="Post a comment..." onChange={(event) => setComment(event.currentTarget.value)} />
                                </form>
                                <div className="postCommentBtn" onClick={() => handlePostComment()}>
                                    Post
                                </div>
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
                                        onLoadedData={(event) => event.currentTarget.play()} onClick={(event) => {
                                            event.preventDefault();
                                            setPostClicked(postID);
                                            enlarge_dispatch({ type: 'true' });
                                        }}>
                                    </video>
                                </div>
                            </a>
                            <div className="socialControls">
                                <ul className="socialControlList">
                                    <li className="socialControlItem">
                                        <div className="socialWaveIcon" onClick={() => authState ? handleFetchLike(false) : dispatch({ type: 'true' })}>
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
                                        <div className="socialWaveIcon" onClick={() => {
                                            setPostClicked(postID);
                                            enlarge_dispatch({ type: 'true' });
                                        }}>
                                            <CommentSVG />
                                        </div>
                                        <h3 className="socialStats">{comments.length}</h3>
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
