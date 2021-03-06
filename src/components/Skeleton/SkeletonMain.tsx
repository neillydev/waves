import React from 'react';

const SkeletonMain = () => {
    return (
        <div className="skeletonContainer">
            <span className="postWrapper">
                <div className="post skeletonPost">
                    <span className="creatorAvatar creatorAvatarImg skeletonAvatar skeletonShimmer">
                    </span>
                    <div className="content skeletonContent">
                        <div className="contentAuthorHeader skeletonHeader">
                            <div className="contentHeader">
                                <div className="contentAuthorTitle">
                                    <span className="skeletonUsername skeletonShimmer"></span>
                                </div>
                            </div>
                        </div>
                        <div className="contentDescription skeletonContentDescription">
                            <span className="skeletonDescription skeletonShimmer"></span>
                        </div>
                        <div className="mediaContainer">
                            <a href="/" className={`mediaWrapper`}>
                                <div className="skeletonMedia skeletonShimmer">
                                </div>
                            </a>
                            <div className="socialControls">
                                <ul className="socialControlList">
                                    <li className="socialControlItem">
                                        <div className="socialWaveIcon skeletonShimmer">
                                        </div>
                                    </li>
                                    <li className="socialControlItem">
                                        <div className="socialWaveIcon skeletonShimmer">
                                        </div>
                                    </li>
                                    <li className="socialControlItem">
                                        <div className="socialControlItemWrapper">
                                            <div className="socialWaveIcon skeletonShimmer">
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="soundDescription">
                            <span className="skeletonSoundDescription skeletonShimmer"></span>
                        </div>
                        <div className="mediaDescription">
                            <span className="skeletonMediaDescription skeletonShimmer"></span>
                        </div>
                    </div>
                </div>
            </span>
        </div>
    )
}

export default SkeletonMain
