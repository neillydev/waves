import React from 'react';

require('./Post.css');

type PostProps = {
    author: string;
    title: string;
    creatorAvatarImg: string;
    contentTitle: string;
    contentDescription: string;
    mediaType: "video" | "image";
    mediaURL: string;
    mediaDescription: string;
};

const Post = ({ author, title, creatorAvatarImg, contentTitle, contentDescription, mediaType, mediaURL, mediaDescription }: PostProps) => {
    return (
        <div className="postContainer">
            <span className="postWrapper">
                <div className="post">
                    <a href="/" className="creatorAvatar">
                        <span className="creatorAvatarImg">
                            <img src={creatorAvatarImg} />
                        </span>
                    </a>
                    <div className="content">
                        <div className="contentAuthorTitle">
                            <h2 className="contentAuthorName">
                                {author}
                            </h2>
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
                        </div>
                        <div className="mediaDescription">
                            <h2 className="mediaDescriptionText">
                                Posted on {mediaDescription}
                            </h2>
                        </div>
                    </div>
                </div>
            </span>
        </div>
    )
};

export default Post;
