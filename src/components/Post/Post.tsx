import React, { useContext, useState, useEffect, useRef } from 'react';
import BoldedText from '../../util/BoldedText';

import { Link } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import { EnlargedContext } from '../contexts/EnlargedContext';

import WaveSVG from '../../svg/wave.svg';
import BWWaveSVG from '../../svg/bw_wave.svg';
import CommentSVG from '../../svg/comment.svg';
import ShareSVG from '../../svg/share.svg';
import CancelSVG from '../../svg/cancel.svg';
import DownArrowSVG from '../../svg/down-arrow.svg';
import MenuSVG from '../../svg/menu.svg';
import LoadingWave from '../LoadingWave/LoadingWave';
import PostDropdown from '../PostDropdown/PostDropdown';

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

    const [loadState, setLoadState] = useState(false);

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
    const [postComments, setPostComments] = useState(comments);
    const [reply, setReply] = useState<any>();
    const [showReplies, setShowReplies] = useState<number>(1);

    const [postDrop, setPostDrop] = useState(false);

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
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: comment_like ? comment_id : post_id, comment_like: comment_like })
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
            setLoadState(true);

            setComment('');
            console.log(reply);
            fetch(`http://localhost:3000/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: post_id, comment: saveComment, reply_to: reply && reply.reply_to ? reply.reply_to : 0 })
            })
                .then(res => {
                    if (res.status == 200) {
                        setTimeout(() => res.json().then((json: any) => {
                            setPostComments([...postComments, json]);
                            setLoadState(false);
                        }), 300)
                    }
                    else if (res.status == 409) {
                        window.location.reload(false);
                        setLoadState(false);
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
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: comment_id ? comment_id : post_id })
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

    useEffect(() => {
        enlarge_dispatch({ type: 'false' });
    }, [location.pathname])
    return (
        <div className="postContainer">
            {
                postClicked ?
                    <div className="postLargeContainer">
                        <div className="postLargeVideoContainer">
                            <div className="postLargeVideoWrapper">
                                <video key={post_id} src={mediaURL} autoPlay preload="auto" playsInline loop className="largeMedia"></video>
                            </div>
                        </div>
                        <CancelSVG onClick={() => {
                            enlarge_dispatch({ type: 'false' });
                            setPostClicked(undefined);
                            setReply(undefined);
                            setShowReplies(1);
                            setComment('');
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
                                            <div className="menuBtnWrapper">
                                                <MenuSVG />
                                            </div>
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

                                    {postComments ? postComments.map((comment: any) => {

                                        if (Number(comment.reply_to) === 0) {
                                            return (<div className="commentItem">
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
                                                        <p className={`commentText ${comment.comment.includes('@') ? 'commentMention' : ''}`}>
                                                            <span>{comment.comment}</span>
                                                            <div className="commentFooter">
                                                                <span className="commentTime">
                                                                    2m ago
                                                                </span>
                                                                <span className="commentReplyBtn" onClick={() => {
                                                                    setReply({
                                                                        reply_to: comment.comment_id,
                                                                        username: comment.user_profile.username
                                                                    });
                                                                }}>
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
                                                {
                                                    comment.replies && comment.replies.length > 0 ?
                                                        comment.replies.map((reply: any) => {
                                                            let lastCommentShown = false;

                                                            if (comment.replies.findIndex((findReply: any) => findReply === reply) < showReplies) {
                                                                if (comment.replies.findIndex((findReply: any) => findReply === reply) + 1 === showReplies) {
                                                                    lastCommentShown = true;
                                                                }
                                                                return (<div className="commentItemReply">
                                                                    <div className="commentItemContent">
                                                                        <Link to={`/@${reply.user_profile.username}`}>
                                                                            <span className="creatorAvatar creatorAvatarImg commentAvatar">
                                                                                <img src={reply.user_profile.avatar} />
                                                                            </span>
                                                                        </Link>
                                                                        <div className="commentItemContentContainer">
                                                                            <Link to={`/@${reply.user_profile.username}`}>
                                                                                <h2 className="contentAuthorName">
                                                                                    {reply.user_profile.username}
                                                                                </h2>
                                                                            </Link>
                                                                            <p className="commentText">
                                                                                <span>{reply.comment.includes('@') ? BoldedText(reply.comment, reply.comment.substr(reply.comment.indexOf('@'), reply.comment.indexOf(' '))) : reply.comment}</span>
                                                                                <div className="commentFooter">
                                                                                    <span className="commentTime">
                                                                                        2m ago
                                                                                    </span>
                                                                                </div>
                                                                            </p>
                                                                        </div>
                                                                        <div className="commentLikesContainer" onClick={() => {
                                                                            handleFetchLike(true, reply.comment_id);
                                                                        }}>
                                                                            {
                                                                                commentLiked.includes(reply.comment_id) === true ?
                                                                                    <WaveSVG />
                                                                                    :
                                                                                    <BWWaveSVG />
                                                                            }
                                                                            <span className="commentLikes">
                                                                                {Number(reply.likes) || 0}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        comment.replies.length > showReplies && lastCommentShown ?
                                                                            <div className="moreReplies" onClick={() => {
                                                                                setShowReplies(showReplies + 2);
                                                                            }}>
                                                                                <p className="moreRepliesText">
                                                                                    More Replies
                                                                                </p>
                                                                                <DownArrowSVG />
                                                                            </div>
                                                                            : null
                                                                    }
                                                                </div>)
                                                            }
                                                        })
                                                        : null
                                                }
                                            </div>)
                                        }
                                    }) : null}
                                </div>
                            </div>
                            <div className="postLargeFormContainer">
                                <form className="postLargeFormWrapper" action="" onSubmit={(event) => {
                                    event.preventDefault();
                                    handlePostComment()
                                }
                                }>
                                    <input value={reply?.username ? `@${reply.username} ${comment.slice(`@${reply.username} `.length)}` : comment} type="text" className="enlargedInputForm" placeholder="Post a comment..." onChange={(event) => setComment(event.currentTarget.value)} />
                                </form>
                                {loadState ? <LoadingWave small={true} /> : <div className="postCommentBtn" onClick={() => handlePostComment()}>
                                    Post
                                </div>}
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
                                        <div className="menuBtnWrapper" onMouseEnter={() => {
                                            setPostDrop(true);
                                        }} onMouseLeave={() => {
                                            setPostDrop(false);
                                        }}>
                                            <MenuSVG />
                                            { postDrop ? <PostDropdown /> : null }
                                        </div>
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
                                    <video key={post_id} src={mediaURL.length > 0 ? mediaURL : ''} autoPlay preload="auto" playsInline loop className="media"
                                        onLoadedData={(event) => event.currentTarget.play()} onClick={(event) => {
                                            event.preventDefault();
                                            setPostClicked(post_id);
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
                                            setPostClicked(post_id);
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
