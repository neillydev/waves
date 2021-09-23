import React from 'react'

require('../Profile/Profile.css');
require('./Skeleton.css');

const SkeletonProfile = () => {
    return (
        <div className="profileContainer">
            <div className="profileWrapper">
                <header className="profileHeader">
                    <div className="profileAvatar skeletonShimmer">
                    </div>
                    <div className="profileDetails">
                        <div className="userControls">
                            <span className="skeletonProfileUsername skeletonShimmer"></span>
                            <div className="editProfile">

                            </div>
                        </div>
                        <ul className="userStats skeletonUserStats">
                            <li className="userFollowers">
                                <span className="skeletonProfileData skeletonShimmer"></span>
                            </li>
                            <li className="userFollowing">
                                <span className="skeletonProfileData skeletonShimmer"></span>
                            </li>
                            <li className="userPosts">
                                <span className="skeletonProfileData skeletonShimmer"></span>
                            </li>
                        </ul>
                        <div className="userBio skeletonUserBio">
                            <span className="skeletonNickname skeletonShimmer"></span>
                            <span className="skeletonBio skeletonShimmer"></span>
                        </div>
                    </div>
                </header>
                <ul className="profileTabs">
                    <li className="profileTab postsTab profileTabSelected">
                    </li>
                    <li className="profileTab taggedTab">
                    </li>
                </ul>
                <div className="postsContainer">
                    <div className="postsFeed">
                        <span className="skeletonPost"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonProfile
