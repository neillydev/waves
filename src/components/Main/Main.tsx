import React, { useState, useEffect, useContext } from 'react';
import Explore from '../Explore/Explore';
import Post from '../Post/Post';

import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';

require('./Main.css');

type PostType = {
    post_id: number;
    avatar: string;
    name: string;
    userID: string;
    username: string;
    caption: string;
    mediaType: "video" | "image";
    media: string;
    date_posted: string;
    sounddescription: string;
    likes: number;
    comments: any;
};

enum ViewType {
    TRENDING,
    FOLLOWING
};

const Main = () => {
    const { authState } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);

    const [viewType, setViewType] = useState<ViewType>(ViewType.TRENDING);

    const [posts, setPosts] = useState<PostType[]>();
    const [postComments, setPostComments] = useState<string[]>();

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

    const handleFetchFollowingPosts = () => {
        fetch(`http://localhost:3000/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                user_id: localStorage.getItem('userid_cache')
            })
        })
            .then(res => res.json())
            .then((json: any) => {
                setPosts(json);
            })
            .catch(error => console.error('Error: ' + error));
    };

    useEffect(() => {
        switch (viewType) {
            case ViewType.FOLLOWING:
                handleFetchFollowingPosts();
                break;
            case ViewType.TRENDING:
                handleFetchPosts();
                break;
            default:
                break;
        }
    }, [viewType]);

    return (
        <div className="mainContainer flex justify-between">
            <div className="leftBarContainer">
                <div className="leftScrollContainer">
                    <div className="leftScrollWrapper">
                        <div className="navWrapper flex flex-col">
                            <a href="/" className="navItem" onClick={(event) => {
                                event.preventDefault();
                                setViewType(ViewType.TRENDING);
                            }}>
                                <h2 className={`navItemTitle ${viewType === ViewType.TRENDING ? 'tabSelected' : ''}`}>
                                    Trending
                                </h2>
                            </a>
                            <a href="/" className="navItem" onClick={(event) => {
                                event.preventDefault();
                                if (authState) {
                                    setViewType(ViewType.FOLLOWING);
                                }
                                else {
                                    dispatch({ type: 'true' });
                                }
                            }}>
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
                    post_id={post.post_id}
                    author={post.username}
                    nickname={post.name}
                    title=""
                    creatorAvatarImg={post.avatar}
                    contentTitle={post.caption}
                    contentDescription={post.caption}
                    mediaType={post.mediaType}
                    mediaURL={post.media}
                    soundDescription={post.sounddescription}
                    mediaDescription={post.date_posted}
                    likes={post.likes}
                    comments={post.comments}
                />) : <h4>Nothing to see here</h4>}
            </div>
        </div>
    )
}

export default Main
