import React from 'react';

import { Link } from 'react-router-dom';

import BWWaveSVG from '../../svg/bw_wave.svg';
import CommentSVG from '../../svg/comment.svg';
import ShareSVG from '../../svg/share.svg';

require('./Post.css');

type PostProps = {
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
};

const Post = ({ author, nickname, title, creatorAvatarImg, contentTitle, contentDescription, mediaType, mediaURL, soundDescription, mediaDescription }: PostProps) => {
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
                                <div className="followBtnWrapper">
                                    <button className="followBtn">
                                        Follow
                                    </button>
                                </div>
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
                                        <div className="socialWaveIcon">
                                            <BWWaveSVG />
                                        </div>
                                        <h3 className="socialStats">0</h3>
                                    </li>
                                    <li className="socialControlItem">
                                        <div className="socialWaveIcon">
                                            <CommentSVG />
                                        </div>
                                        <h3 className="socialStats">0</h3>
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
