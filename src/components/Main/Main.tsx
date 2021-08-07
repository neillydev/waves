import React from 'react'

require('./Main.css');

const Main = () => {
    return (
        <div className="mainContainer flex justify-between">
            <div className="leftBarContainer">
                <div className="leftScrollContainer">
                    <div className="leftScrollWrapper">
                        <div className="navWrapper flex flex-col">
                            <a href="/" className="navItem">Trending</a>
                            <a href="/" className="navItem">Following</a>
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
