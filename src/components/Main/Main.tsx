import React from 'react';
import Explore from '../Explore/Explore';

require('./Main.css');

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
                            <Explore />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainContentContainer">

            </div>
        </div>
    )
}

export default Main
