import React from 'react'

require('../SearchDropdown/SearchDropdown.css');
require('./Skeleton.css');

const SkeletonSearch = () => {
    return (
        <li className="searchDropdownItem">
            <span className="searchItemAvatar skeletonShimmer skeletonShimmerSearch">
            </span>
            <span className="searchItemContent">
                <p className="skeletonItemUsername skeletonShimmer skeletonShimmerSearch"></p>
                <p className="skeletonItemName skeletonShimmer skeletonShimmerSearch"></p>
            </span>
        </li>
    )
}

export default SkeletonSearch;
