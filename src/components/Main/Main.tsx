import React, { useState, useEffect, useContext } from 'react';
import Explore from '../Explore/Explore';
import Post from '../Post/Post';

import { Link } from 'react-router-dom';

import FireSVG from '../../svg/fire.svg';
import FireDarkSVG from '../../svg/fire_dark.svg';
import UserSVG from '../../svg/user.svg';
import UserDarkSVG from '../../svg/user_dark.svg';

import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import { LoadingContext } from '../contexts/LoadingContext';
import LoadingWave from '../LoadingWave/LoadingWave';
import Skeleton from '../Skeleton/Skeleton';

require('./Main.css');

type PostType = {
    post_id: number;
    avatar: string;
    name: string;
    wavecreators_id: string;
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
    const { load_state, loading_dispatch } = useContext(LoadingContext);

    const [viewType, setViewType] = useState<ViewType>(ViewType.TRENDING);

    const [posts, setPosts] = useState<PostType[]>();
    const [suggested, setSuggested] = useState<any>(undefined);

    const [followingList, setFollowingList] = useState<any>([]);

    const handleFetchSuggested = () => {
        fetch(`http://localhost:3000/suggested`, {
            method: 'GET'
        })
            .then(res => {
                if (res.status == 200) {
                    res.json().then((json: any) => {
                        setSuggested(json);
                    });
                }
            })
            .catch(error => console.error('Error: ' + error));
    };

    const handleFetchPosts = () => {
        loading_dispatch({ loading: true, type: 'loading_bar' });
        fetch(`http://localhost:3000/posts`, {
            method: 'GET'
        })
            .then(res => {
                if (res.status == 200) {
                    res.json().then((json: any) => {
                        setPosts(json);
                        setTimeout(() => {
                            loading_dispatch({ loading: true, type: 'bar' });
                        }, 200);
                    });
                }
                else if (res.status == 409) {
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error: ' + error));
    };

    const handleUpdateFollowing = (author_id: string) => {
        loading_dispatch({ loading: true, type: 'loading_bar' });
        switch (followingList.filter((following_id: string) => following_id === author_id).length) {
            case 0:
                setFollowingList((oldFollowingList: any) => [...oldFollowingList, author_id])
                break;
            case 1:
                let tmpFollowingList = followingList;
                tmpFollowingList.splice(tmpFollowingList.findIndex((following_id: string) => following_id === author_id), 1);
                setFollowingList([...tmpFollowingList]);
                break;
            default:
                break;
        }
        setTimeout(() => {
            loading_dispatch({ loading: true, type: 'bar' });
        }, 200)
    }

    const handleCheckIfFollowing = () => {
        fetch(`http://localhost:3000/following`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache") })
        })
            .then(res => {
                if (res.status == 200) {
                    res.json().then((json: any[]) => {
                        setFollowingList(json);
                    });
                }
                else if (res.status == 409) {

                }
            })

            .catch(error => console.error('Error: ' + error));
    };

    const handleFetchFollowingPosts = () => {
        loading_dispatch({ loading: true, type: 'loading_bar' });
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
            .then(res => {
                if (res.status == 200) {
                    res.json().then((json: any) => {
                        setPosts(json);
                        setTimeout(() => {
                            loading_dispatch({ loading: true, type: 'bar' });
                        }, 200);
                    });
                }
                else if (res.status == 409) {
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error: ' + error));
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        if(authState) {
            handleCheckIfFollowing();
        }
        
        handleFetchSuggested();
        
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
                            <a href="/" className={`navItem ${viewType === ViewType.TRENDING ? 'navItemSelected' : ''}`} onClick={(event) => {
                                event.preventDefault();
                                setViewType(newView => ViewType.TRENDING);
                            }}>
                                {viewType === ViewType.TRENDING ? <FireDarkSVG /> : <FireSVG />}
                                <h2 className={`navItemTitle ${viewType === ViewType.TRENDING ? 'tabSelected' : ''}`}>
                                    Trending
                                </h2>
                            </a>
                            <a href="/" className={`navItem ${viewType === ViewType.FOLLOWING ? 'navItemSelected' : ''}`} onClick={(event) => {
                                event.preventDefault();
                                if (authState) {
                                    setViewType(newView => ViewType.FOLLOWING);
                                }
                                else {
                                    dispatch({ type: 'true' });
                                }
                            }}>
                                {viewType === ViewType.TRENDING ? <UserSVG /> : <UserDarkSVG />}
                                <h2 className={`navItemTitle ${viewType === ViewType.FOLLOWING ? 'tabSelected' : ''}`}>
                                    Following
                                </h2>
                            </a>
                        </div>
                        <div className="suggestedWrapper">
                            {
                                suggested ? suggested.map((user: any) =>
                                    <Link to={`/@${user.username}`}>
                                        <span className="suggestedCreator">
                                            <span className="suggestedCreatorWrapper">
                                                <img className="suggestedCreatorAvatar" src={user.avatar} />
                                            </span>
                                        </span>
                                    </Link>
                                ) : null
                            }
                        </div>
                        <div className="exploreWrapper pt-6">
                            <h2 className="exploreTitle">
                                Surf
                            </h2>
                            <div className="exploreTags w-full">
                                <Explore title="waves" />
                            </div>
                        </div>
                        <div className="leftFooterWrapper">
                            <h3 className="wavesCopyright">© 2021 Waves</h3>
                        </div>
                    </div>
                </div>
            </div>
            {
                load_state !== "bar" ?
                    <Skeleton type="main" />
                    :
                    <div className={`${viewType === ViewType.TRENDING ? 'trendingContainer' : 'followingContainer'} ${posts && posts.length !== 0 ? 'mainContentSome' : 'mainContentNone'}`}>
                        {posts && posts.length !== 0 ? posts.map(post => <Post
                            key={post.post_id}
                            post_id={post.post_id}
                            author_id={post.wavecreators_id}
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
                            followingAuthor={followingList ? (followingList.filter((following_id: any) => following_id === post.wavecreators_id).length > 0 ? true : false) : false}
                            handleUpdateFollowing={handleUpdateFollowing}
                        />) : <h4>Nothing to see here</h4>}
                    </div>
            }
        </div>
    )
}

export default Main
