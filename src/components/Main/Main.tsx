import React from 'react';
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

const Main = () => {
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
            <div className="mainContentContainer">
                <h4>Nothing to see here</h4>
            </div>
        </div>
    )
}

export default Main
