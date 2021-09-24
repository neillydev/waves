import React, { useContext, useState, useEffect, useRef } from 'react';
import BoldedText from '../../util/BoldedText';

import { Link } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import { EnlargedContext } from '../contexts/EnlargedContext';
import { LoadingContext } from '../contexts/LoadingContext';

import WaveSVG from '../../svg/wave.svg';
import BWWaveSVG from '../../svg/bw_wave.svg';
import CommentSVG from '../../svg/comment.svg';
import CancelSVG from '../../svg/cancel.svg';
import DownArrowSVG from '../../svg/down-arrow.svg';
import MenuSVG from '../../svg/menu.svg';
import LoadingWave from '../LoadingWave/LoadingWave';
import PostDropdown from '../PostDropdown/PostDropdown';

require('../Post/Post.css');

type EnlargedPostProps = {
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
    handlePostClicked: (postClicked: number | undefined) => void;
    handleDeletePost: () => void;
    handleFetchFollow: () => void;
    handleFetchLike: (comment_like: boolean, comment_id?: number) => void;
    handlePostComment: () => void;
};

const EnlargedPost = ({ post_id, author, nickname, title, creatorAvatarImg, contentTitle, contentDescription, mediaType, mediaURL, soundDescription, mediaDescription, likes, comments, handlePostClicked, handleDeletePost, handleFetchFollow, handleFetchLike, handlePostComment }: EnlargedPostProps) => {

    const [loadState, setLoadState] = useState(false);

    const { authState } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);
    const { enlarge_dispatch } = useContext(EnlargedContext);

    const [postCaption, setPostCaption] = useState(contentDescription);

    const [postLikes, setPostLikes] = useState(Number(likes));

    const [liked, setLiked] = useState(false);
    const [commentLiked, setCommentLiked] = useState<number[]>([]);

    const [followed, setFollowed] = useState(false);

    const [postClicked, setPostClicked] = useState<number>();

    const [comment, setComment] = useState<string>('');
    const [postComments, setPostComments] = useState(comments);
    const [reply, setReply] = useState<any>();
    const [showReplies, setShowReplies] = useState<number>(1);

    const [postDrop, setPostDrop] = useState(false);

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
                                <div className="menuBtnWrapper" onMouseEnter={() => {
                                    setPostDrop(true);
                                }} onMouseLeave={() => {
                                    setPostDrop(false);
                                }}>
                                    <MenuSVG />
                                    {postDrop ? <PostDropdown handleDeletePost={handleDeletePost} /> : null}
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
                    <h1 className="postLargeCaption" dangerouslySetInnerHTML={{ __html: postCaption }}></h1>
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
    )
}

export default EnlargedPost
