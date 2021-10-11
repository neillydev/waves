import React, { useContext, useState, useEffect, useRef } from 'react';
import BoldedText from '../../util/BoldedText';

import PostDropdown from '../PostDropdown/PostDropdown';
import EnlargedPost from '../EnlargedPost/EnlargedPost';

import { handleCheckIfLiked, handleFetchLike } from '../../api/PostAPI';

import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';

import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import { EnlargedContext } from '../contexts/EnlargedContext';
import { LoadingContext } from '../contexts/LoadingContext';

import WaveSVG from '../../svg/wave.svg';
import BWWaveSVG from '../../svg/bw_wave.svg';
import CommentSVG from '../../svg/comment.svg';
import ShareSVG from '../../svg/share.svg';
import MenuSVG from '../../svg/menu.svg';
import LoadingWave from '../LoadingWave/LoadingWave';

require('./Post.css');

type PostProps = {
    post_id: number;
    author_id: string;
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
    followingAuthor: boolean;
    handleUpdateFollowing: (author_id: string) => void;
};

const Post = ({ post_id, author, author_id, nickname, title, creatorAvatarImg, contentTitle, contentDescription, mediaType, mediaURL, soundDescription, mediaDescription, likes, comments, followingAuthor, handleUpdateFollowing }: PostProps) => {

    const [loadState, setLoadState] = useState(false);

    const { authState } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);
    const { enlarge_dispatch } = useContext(EnlargedContext);

    const videoRef = useRef<HTMLVideoElement>(null);

    const [visible, setVisible] = useState(false)

    const [verified, setVerified] = useState(false);

    const [postCaption, setPostCaption] = useState(contentDescription);

    const [postLikes, setPostLikes] = useState(Number(likes));

    const [liked, setLiked] = useState(false);
    const [commentLiked, setCommentLiked] = useState<number[]>([]);

    const [followed, setFollowed] = useState(followingAuthor);

    const [postClicked, setPostClicked] = useState<number>();

    const [postComments, setPostComments] = useState(comments);
    const [commentAmount, setCommentAmount] = useState(0);

    const [postDrop, setPostDrop] = useState(false);

    const handlePostClicked = (postClicked: number | undefined) => {
        setPostClicked(postClicked);
    };

    const handleLoadState = (loadState: boolean) => {
        setLoadState(loadState);
    }

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
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error: ' + error));
    };

    useEffect(() => {
        if (postCaption.includes('#')) {
            var str = postCaption;
            var strArray = postCaption.split('#').map((hashtagStr, i) => '#' + hashtagStr.replaceAll(' ', ''));

            strArray.map((strArrayStr, i) => {
                i > 0 ? str = str.replace(strArrayStr, `<span class="hashtagItem">${strArrayStr.bold()}</span>`) : null
            });
            setPostCaption(str);
        }

        let commentAmt = postComments.length;

        postComments.map((comment: any) => {
            commentAmt += comment.replies.length;
        });
        setCommentAmount(commentAmt);

        if (authState) {

            handleCheckIfLiked(post_id).then((json: any) => {
                if (json.post_id.toString().length < 17) {
                    //temp solution. need to fix where you're returning comment_like boolean, as it's undefined always, causing comments to register...
                    //...as a post and therefore forcing posts to become unliked, as a result of the comment not being liked
                    setLiked(json.liked);
                }
                
            });
        }
    }, [])

    useEffect(() => {
        enlarge_dispatch({ type: 'false' });
    }, [location.pathname])
    return (
        <div className="postContainer">
            {
                postClicked ?
                    <EnlargedPost key={post_id}
                        verified={verified}
                        post_id={post_id}
                        username={author}
                        name={nickname}
                        title=""
                        creatorAvatarImg={creatorAvatarImg}
                        following={followed}
                        contentTitle={contentTitle}
                        contentDescription={contentDescription}
                        mediaType={mediaType}
                        mediaURL={mediaURL}
                        soundDescription={soundDescription}
                        mediaDescription={mediaDescription}
                        likes={postLikes}
                        comments={comments}
                        commentAmt={commentAmount}
                        handleCommentAmountChange={setCommentAmount}
                        handlePostClicked={handlePostClicked} />
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
                                            {postDrop ? <PostDropdown post_id={post_id} handleLoadState={handleLoadState} /> : null}
                                        </div>
                                        :
                                        <div className="followBtnWrapper">
                                            <button className="followBtn" onClick={authState ? () => {
                                                handleUpdateFollowing(author_id);
                                                handleFetchFollow()
                                            } : () => dispatch({ type: 'true' })}>
                                                {followed ? "Following" : "Follow"}
                                            </button>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="contentDescription">
                            <h2 className="contentDescriptionText" dangerouslySetInnerHTML={{ __html: postCaption }}>
                            </h2>
                        </div>
                        <div className="mediaContainer">
                            <a href="/" className={`mediaWrapper ${loadState ? 'mediaWrapperLoading' : ''}`}>
                                {loadState ? <LoadingWave /> : null}
                                <div className="mediaImg">
                                    <VisibilitySensor onChange={(isVisible) => {
                                        if (isVisible) {
                                            setVisible(true);
                                            videoRef?.current?.play();
                                        }
                                        else {
                                            setVisible(false);
                                            videoRef?.current?.pause();
                                        }
                                    }}>
                                        <video controls ref={videoRef} key={post_id} src={mediaURL.length > 0 ? mediaURL : ''} loop onPlay={() => visible ? null : videoRef.current?.pause()} className="media"
                                            onLoadedData={(event) => event.currentTarget.play()} onClick={(event) => {
                                                event.preventDefault();
                                                setPostClicked(post_id);
                                                videoRef.current?.pause();
                                                enlarge_dispatch({ type: 'true' });
                                            }}>
                                        </video>
                                    </VisibilitySensor>
                                </div>
                            </a>
                            <div className="socialControls">
                                <ul className="socialControlList">
                                    <li className="socialControlItem">
                                        <div className="socialWaveIcon" onClick={() => authState ? handleFetchLike(false, post_id).then((json: any) => {
                                            setPostLikes(json.likes);
                                            setLiked(!liked);
                                        }) : dispatch({ type: 'true' })}>
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
                                        <h3 className="socialStats">{commentAmount}</h3>
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
                    </div>
                </div>
            </span>
        </div >
    )
};

export default Post;
