import React, { useState, useEffect } from 'react';
import Explore from '../Explore/Explore';
import Post from '../Post/Post';

require('./Main.css');

/* <Post 
author="kidfoolish" 
title="Fooli" 
creatorAvatarImg="https://avatars.githubusercontent.com/u/51303046?v=4" 
contentTitle="" 
contentDescription="1st post" 
mediaType="image"
mediaDescription="fooli"
/> */

type PostType = {
    userID: string;
    username: string;
    caption: string;
    mediaType: "video" | "image";
    media: string;
    date_posted: string;
};

const Main = () => {

    const [posts, setPosts] = useState<PostType[]>();

    const handleFetchPosts = () => {
        fetch(`http://localhost:3000/posts`, {
            method: 'GET'
        })
            .then(res => {
                if (res) {
                    if (res.status == 200) {
                        res.json().then(json => {
                            setPosts(json);
                        });
                    }
                }
            })
            .then(response => console.log('Success: '))
            .catch(error => console.error('Error: '));
    };

    useEffect(() => {
        handleFetchPosts();
    }, []);

    return (
        <div className="mainContainer flex justify-between">
            <div className="leftBarContainer">
                <div className="leftScrollContainer">
                    <div className="leftScrollWrapper">
                        <div className="navWrapper flex flex-col">
                            <a href="/" className="navItem">
                                <h2 className="navItemTitle">
                                    Trending
                                </h2>
                            </a>
                            <a href="/" className="navItem">
                                <h2 className="navItemTitle">
                                    Following
                                </h2>
                            </a>
                        </div>
                        <div className="exploreWrapper pt-6">
                            <h2 className="exploreTitle">
                                Explore
                            </h2>
                            <div className="exploreTags w-full">
                                <Explore title="waves" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`mainContentContainer ${posts && posts.length !== 0 ? 'mainContentSome' : 'mainContentNone'}`}>
                {posts && posts.length !== 0 ? posts.map(post => <Post
                    author={post.username}
                    title=""
                    creatorAvatarImg="https://avatars.githubusercontent.com/u/51303046?v=4"
                    contentTitle={post.caption}
                    contentDescription={post.caption}
                    mediaType={post.mediaType}
                    mediaURL={post.media}
                    mediaDescription={post.date_posted}
                />) : <h4>Nothing to see here</h4>}
            </div>
        </div>
    )
}

export default Main
