import React from 'react';

require('./Post.css');

type PostProps = {
    author: string;
    title: string;
    creatorAvatarImg: string;
    contentTitle: string;
    contentDescription: string; 
    mediaType: "video" | "image";
};

const Post = ({ author, title, creatorAvatarImg, contentTitle, contentDescription, mediaType }: PostProps) => {
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

                        </div>
                        <div className="contentDescription">

                        </div>
                        <div className="mediaContainer">

                        </div>
                    </div>
                </div>
            </span>
        </div>
    )
};

export default Post;
