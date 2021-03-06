import React, { useContext, useState, useEffect, useRef } from 'react';
import BoldedText from '../../util/BoldedText';
import RelativeTime from '../../util/RelativeTime';

import { Link } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import { EnlargedContext } from '../contexts/EnlargedContext';

import { handleFetchFollow, handlePostComment, handleFetchLike, handleCheckIfLiked } from '../../api/PostAPI';

import WaveSVG from '../../svg/wave.svg';
import BWWaveSVG from '../../svg/bw_wave.svg';
import CommentSVG from '../../svg/comment.svg';
import CancelSVG from '../../svg/cancel.svg';
import VerifiedSVG from '../../svg/correct.svg';
import DownArrowSVG from '../../svg/down-arrow.svg';
import MenuSVG from '../../svg/menu.svg';
import LoadingWave from '../LoadingWave/LoadingWave';
import PostDropdown from '../PostDropdown/PostDropdown';

require('../Post/Post.css');

type EnlargedPostProps = {
    verified: boolean;
    post_id: number;
    username: string;
    name: string;
    title: string;
    creatorAvatarImg: string;
    following: boolean;
    contentTitle: string;
    contentDescription: string;
    mediaType: "video" | "image";
    mediaURL: string;
    soundDescription: string;
    mediaDescription: string;
    likes: number;
    liked: boolean;
    setPostLikes: (amount: number) => void;
    setLiked: (liked: boolean) => void;
    comments: any;
    commentAmt: number;
    handleCommentAmountChange: (amount: number) => void;
    handlePostClicked: (postClicked: number | undefined) => void;
};

type ShowRepliesType = {
    [key: string]: {
        showAmount: number;
        lastCommentShown: number;
    }
};

const EnlargedPost = ({ verified, post_id, username, name, creatorAvatarImg, following, contentDescription, mediaURL, soundDescription, likes, liked, setPostLikes, setLiked, comments, commentAmt, handleCommentAmountChange, handlePostClicked }: EnlargedPostProps) => {

    const [loadState, setLoadState] = useState(false);

    const { authState } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);
    const { enlarge_dispatch } = useContext(EnlargedContext);

    const [postCaption, setPostCaption] = useState(contentDescription);

    const [commentLiked, setCommentLiked] = useState<number[]>([]);

    const [followed, setFollowed] = useState(following);

    const [comment, setComment] = useState<string>('');
    const [postComments, setPostComments] = useState(comments);
    const [reply, setReply] = useState<any>();
    const [showReplies, setShowReplies] = useState<ShowRepliesType>({});

    const [postDrop, setPostDrop] = useState(false);

    const handleLoadState = (loadState: boolean) => {
        setLoadState(loadState);
    }

    const handleUpdateLike = (comment_id: number, likes: number, reply = false) => {
        //temporary solution

        let tmpPostComments = postComments;

        let replyObj = {
            commentIndex: 0,
            replyIndex: 0,
            reply: {

            }
        }

        if (reply) {
            replyObj.commentIndex = tmpPostComments.findIndex((comment: any) => comment.replies.findIndex((reply: any) => reply.comment_id === comment_id) != -1);

            replyObj.replyIndex = tmpPostComments[replyObj.commentIndex].replies.findIndex(((reply: any) => reply.comment_id === comment_id));

            replyObj.reply = tmpPostComments[replyObj.commentIndex].replies[replyObj.replyIndex];
        }
        let item = reply ? {
            ...replyObj.reply,
            likes: Number(likes)
        } : {
            ...tmpPostComments[tmpPostComments.findIndex((comment: any) => comment.comment_id === comment_id)],
            likes: Number(likes)
        }
        reply ? tmpPostComments[replyObj.commentIndex].replies[replyObj.replyIndex] = item : tmpPostComments[tmpPostComments.findIndex((comment: any) => comment.comment_id === comment_id)] = item;
        setPostComments([...tmpPostComments]);

        postComments.map((comment: any, i: number) => {
            handleCheckIfLiked(comment.comment_id, comment.comment_id).then((json: any) => {
                if (json.liked) {
                    setCommentLiked(oldArray => [...oldArray, Number(json.post_id)]);
                }
                else if (commentLiked.includes(Number(json.post_id))) {
                    let newCommentLiked = commentLiked;
                    newCommentLiked.splice(newCommentLiked.findIndex((comment_id) => comment_id === Number(json.post_id)), 1);
                    setCommentLiked([...newCommentLiked])
                }
            });
        });
    }

    const handleCommentBtn = () => {
        if (comment) {
            handleCommentAmountChange(commentAmt + 1);
            setLoadState(true);
            setComment('');
            handlePostComment(post_id, reply && reply.reply_to ? reply.reply_to : 0, comment).then((json: any) => {
                let tmpPostComments = postComments;
                if (Number(json.reply_to) !== 0) {
                    let commentIndex = tmpPostComments.findIndex((comment: any) => comment.comment_id === json.reply_to.toString());
                    tmpPostComments[commentIndex].replies.push(json);
                    setReply(undefined);
                }
                else {

                    tmpPostComments.push(json);
                }
                setPostComments([...tmpPostComments]);
                setLoadState(false);
            }).catch(() => {
                setLoadState(false);
            });
        }
    }

    const handleInitLikes = (comment: any) => {
        handleCheckIfLiked(comment.comment_id, comment.comment_id).then((json: any) => {
            if (json.liked) {
                setCommentLiked(oldArray => [...oldArray, Number(json.post_id)]);
            }
            else if (commentLiked.includes(Number(json.post_id))) {
                let newCommentLiked = commentLiked;
                newCommentLiked.splice(newCommentLiked.findIndex((comment_id) => comment_id === Number(json.post_id)), 1);
                setCommentLiked([...newCommentLiked])
            }
        });
    };

    useEffect(() => {
        handleCheckIfLiked(post_id).then((json: any) => setLiked(json.liked));

        console.log(postComments);

        //temporary solution
        postComments.map((comment: any) => {
            if(comment.replies.length > 0) {
                comment.replies.map((comment: any) => {
                    handleInitLikes(comment);
                })
            }
            handleInitLikes(comment);
        });
    }, []);

    return (
        <div className="postLargeContainer">
            <div className="postLargeVideoContainer">
                <div className="postLargeVideoWrapper">
                    <video key={post_id} src={mediaURL} autoPlay preload="auto" playsInline loop className="largeMedia"></video>
                </div>
            </div>
            <CancelSVG onClick={() => {
                enlarge_dispatch({ type: 'false' });
                handlePostClicked(undefined);
                setReply(undefined);
                setShowReplies({});
                setComment('');
            }} />
            <div className="postLargeSocialContainer">
                <div className="postLargeAuthor">
                    <div className="postLargeAuthorWrapper">
                        <div className="postLargeAuthorInfo">
                            <Link to={`/@${username}`}>
                                <span className="creatorAvatar creatorAvatarImg">
                                    <img src={creatorAvatarImg} />
                                </span>
                            </Link>
                            <div className="contentAuthorTitle contentAuthorLarge">
                                <Link to={`/@${username}`} className="contentAuthor">
                                    <h2 className="contentAuthorName">
                                        {username}
                                    </h2>
                                    {verified ? <VerifiedSVG /> : null}
                                </Link>
                                <h3 className="contentAuthorNickname">{name}</h3>
                            </div>
                        </div>
                        {
                            localStorage.getItem('username_cache') && username === localStorage.getItem('username_cache') ?
                                <div className="menuBtnWrapper" onMouseEnter={() => {
                                    setPostDrop(true);
                                }} onMouseLeave={() => {
                                    setPostDrop(false);
                                }}>
                                    <MenuSVG />
                                    {postDrop ? <PostDropdown post_id={post_id} handleLoadState={handleLoadState} /> : null}
                                </div>
                                :
                                <div className="followBtnWrapper">
                                    <button className="followBtn" onClick={authState ? () => handleFetchFollow(username) : () => dispatch({ type: 'true' })}>
                                        {followed ? "Following" : "Follow"}
                                    </button>
                                </div>
                        }
                    </div>
                </div>
                <div className="postLargeDesc">
                    <h1 className="postLargeCaption" dangerouslySetInnerHTML={{ __html: postCaption }}></h1>
                    <h1 className="postLargeSoundDesc">{soundDescription}</h1>
                    <div className="postSocialControls">
                        <div className="leftControls">
                            <div className="controlItem">
                                <span className="socialWaveIcon controlIcon likeIcon" onClick={() => authState ? handleFetchLike(false, post_id).then((json: any) => {
                                    setPostLikes(json.likes);
                                    setLiked(!liked);
                                }) : dispatch({ type: 'true' })}>
                                    {
                                        liked ?
                                            <WaveSVG />
                                            :
                                            <BWWaveSVG />
                                    }
                                </span>
                                <h3 className="socialStats controlStats">{likes}</h3>
                            </div>
                            <div className="controlItem">
                                <span className="socialWaveIcon controlIcon likeIcon">
                                    <CommentSVG />
                                </span>
                                <h3 className="socialStats controlStats">{commentAmt}</h3>
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
                                                        {RelativeTime(comment.timestamp)}
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
                                            handleFetchLike(true, post_id, comment.comment_id).then((json: any) => {

                                                if (json.comment_like) {
                                                    let newCommentLiked = commentLiked;
                                                    if (commentLiked.includes(Number(json.post_id)) === false) {
                                                        setCommentLiked(newCommentLiked => [...newCommentLiked, json.post_id]);
                                                    }
                                                    else {
                                                        newCommentLiked.splice(newCommentLiked.findIndex((commentID) => commentID === comment.comment_id), 1);
                                                        setCommentLiked([...newCommentLiked]);
                                                    }
                                                    handleUpdateLike(json.post_id, json.likes);
                                                }
                                            });
                                        }}>
                                            {
                                                commentLiked.includes(Number(comment.comment_id)) === true ?
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
                                                if (!showReplies[comment.comment_id]) {
                                                    let tmpShowReplies = showReplies;
                                                    tmpShowReplies[comment.comment_id] = {
                                                        showAmount: 1,
                                                        lastCommentShown: reply.comment_id
                                                    };
                                                    setShowReplies({ ...tmpShowReplies });
                                                }

                                                if (comment.replies.findIndex((findReply: any) => findReply === reply) < showReplies[comment.comment_id].showAmount) {
                                                    return comment.replies.findIndex((findReply: any) => findReply === reply) + 1 <= showReplies[comment.comment_id].showAmount ? (<div className="commentItemReply">
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
                                                                            {RelativeTime(reply.timestamp)}
                                                                        </span>
                                                                    </div>
                                                                </p>
                                                            </div>
                                                            <div className="commentLikesContainer" onClick={() => {
                                                                handleFetchLike(true, reply.comment_id, reply.comment_id).then((json: any) => {

                                                                    if (json.comment_like) {
                                                                        let newCommentLiked = commentLiked;
                                                                        if (commentLiked.includes(Number(json.post_id)) === false) {
                                                                            setCommentLiked(newCommentLiked => [...newCommentLiked, Number(json.post_id)]);
                                                                        }
                                                                        else {
                                                                            newCommentLiked.splice(newCommentLiked.findIndex((commentID) => commentID === Number(reply.comment_id)), 1);
                                                                            setCommentLiked([...newCommentLiked]);
                                                                        }
                                                                        handleUpdateLike(json.post_id, json.likes, true);
                                                                    }
                                                                });
                                                            }}>
                                                                {
                                                                    commentLiked.includes(Number(reply.comment_id)) === true ?
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
                                                            comment.replies.length > showReplies[comment.comment_id].showAmount && (showReplies[comment.comment_id].lastCommentShown === reply.comment_id) ?
                                                                <div className="moreReplies" onClick={() => {
                                                                    let tmpShowReplies = showReplies;
                                                                    tmpShowReplies[comment.comment_id].showAmount = showReplies[comment.comment_id].showAmount + 2;
                                                                    tmpShowReplies[comment.comment_id].lastCommentShown = comment.replies[comment.replies.findIndex((findReply: any) => findReply === reply) + showReplies[comment.comment_id].showAmount]?.comment_id;
                                                                    setShowReplies({ ...tmpShowReplies });
                                                                }}>
                                                                    <p className="moreRepliesText">
                                                                        More Replies
                                                                    </p>
                                                                    <DownArrowSVG />
                                                                </div>
                                                                : null
                                                        }
                                                    </div>) : null
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
                        handleCommentBtn();
                    }
                    }>
                        <input value={reply?.username ? `@${reply.username} ${comment.slice(`@${reply.username} `.length)}` : comment} type="text" className="enlargedInputForm" placeholder="Post a comment..." onChange={(event) => setComment(event.currentTarget.value)} />
                    </form>
                    {loadState ? <LoadingWave small={true} /> : <div className="postCommentBtn" onClick={() => {
                        handleCommentBtn();
                    }}>
                        Post
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default EnlargedPost
