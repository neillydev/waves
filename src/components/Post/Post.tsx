import React, { useContext, useState, useEffect, useRef } from 'react';
import BoldedText from '../../util/BoldedText';

import PostDropdown from '../PostDropdown/PostDropdown';
import EnlargedPost from '../EnlargedPost/EnlargedPost';

import { handleCheckIfLiked } from '../../api/PostAPI';

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
import CancelSVG from '../../svg/cancel.svg';
import DownArrowSVG from '../../svg/down-arrow.svg';
import MenuSVG from '../../svg/menu.svg';
import LoadingWave from '../LoadingWave/LoadingWave';

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
    const { load_state, loading_dispatch } = useContext(LoadingContext);

    const { authState } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);
    const { enlarge_dispatch } = useContext(EnlargedContext);

    const videoRef = useRef<HTMLVideoElement>(null);

    const [visible, setVisible] = useState(false)

    const [postID, setPostID] = useState(post_id);

    const [postCaption, setPostCaption] = useState(contentDescription);

    const [postLikes, setPostLikes] = useState(Number(likes));

    const [liked, setLiked] = useState(false);
    const [commentLiked, setCommentLiked] = useState<number[]>([]);

    const [followed, setFollowed] = useState(false);

    const [postClicked, setPostClicked] = useState<number>();

    const [comment, setComment] = useState<string>('');
    const [postComments, setPostComments] = useState(comments);
    const [reply, setReply] = useState<any>();

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
                        if (!json.comment_like) {
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

    

    useEffect(() => {
        if (postCaption.includes('#')) {
            var str = postCaption;
            var strArray = postCaption.split('#').map((hashtagStr, i) => '#' + hashtagStr.replaceAll(' ', ''));

            strArray.map((strArrayStr, i) => {
                i > 0 ? str = str.replace(strArrayStr, `<span class="hashtagItem">${strArrayStr.bold()}</span>`) : null
            });
            setPostCaption(str);
        }
        if (authState) {
            handleCheckIfLiked(post_id).then((json: any) => {
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
            });
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
                        <EnlargedPost key={post_id}
                        post_id={post_id}
                        username={author}
                        name={nickname}
                        title=""
                        creatorAvatarImg={creatorAvatarImg}
                        contentTitle={contentTitle}
                        contentDescription={contentDescription}
                        mediaType={mediaType}
                        mediaURL={mediaURL}
                        soundDescription={soundDescription}
                        mediaDescription={mediaDescription}
                        likes={likes}
                        comments={comments}
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
                                            {postDrop ? <PostDropdown post_id={post_id} handleLoadState={handleLoadState}  /> : null}
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
                            <h2 className="contentDescriptionText" dangerouslySetInnerHTML={{ __html: postCaption }}>
                            </h2>
                    </div>
                    <div className="mediaContainer">
                        <a href="/" className={`mediaWrapper ${loadState ? 'mediaWrapperLoading' : ''}`}>
                            {loadState ? <LoadingWave /> : null}
                            <div className="mediaImg">
                                <VisibilitySensor onChange={(isVisible) => {
                                    if (isVisible) {
                                        console.log('visible!')
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
                    {/* <div className="mediaDescription">
                        <h2 className="mediaDescriptionText">
                            {mediaDescription}
                        </h2>
                    </div> */}
                </div>
                </div>
            </span>
        </div >
    )
};

export default Post;
