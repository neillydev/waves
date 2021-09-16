import React, { useState, useEffect, Suspense } from 'react';
import Explore from '../Explore/Explore';
import Post from '../Post/Post';

require('./Main.css');

type PostType = {
    avatar: string;
    name: string;
    userID: string;
    username: string;
    caption: string;
    mediaType: "video" | "image";
    media: string;
    date_posted: string;
    sounddescription: string;
};

enum ViewType {
    TRENDING,
    FOLLOWING
};

const Main = () => {
    const [viewType, setViewType] = useState<ViewType>(ViewType.TRENDING);

    const [posts, setPosts] = useState<PostType[]>();

    const handleFetchPosts = () => {
        fetch(`http://localhost:3000/posts`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((json: any) => {
                setPosts(json);
            })
            .catch(error => console.error('Error: ' + error));
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
                            <a href="/" className="navItem" onClick={() => setViewType(ViewType.TRENDING)}>
                                <h2 className={`navItemTitle ${viewType === ViewType.TRENDING ? 'tabSelected' : ''}`}>
                                    Trending
                                </h2>
                            </a>
                            <a href="/" className="navItem" onClick={() => setViewType(ViewType.FOLLOWING)}>
                                <h2 className={`navItemTitle ${viewType === ViewType.FOLLOWING ? 'tabSelected' : ''}`}>
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
                    nickname={post.name}
                    title=""
                    creatorAvatarImg={atob(post.avatar)}
                    contentTitle={post.caption}
                    contentDescription={post.caption}
                    mediaType={post.mediaType}
                    mediaURL={post.media}
                    soundDescription={post.sounddescription}
                    mediaDescription={post.date_posted}
                />) : <h4>Nothing to see here</h4>}
            </div>
        </div>
    )
}

export default Main
