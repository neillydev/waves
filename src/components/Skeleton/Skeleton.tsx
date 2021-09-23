import React from 'react';
import SkeletonMain from './SkeletonMain';
import SkeletonProfile from './SkeletonProfile';

require('../Post/Post.css');
require('./Skeleton.css');

type SkeletonProps = {
    type: string;
};

const Skeleton = ({ type }: SkeletonProps) => {
    return (
        <>
            {
                type === 'main' ?
                    <SkeletonMain />
                    : type === 'profile' ?
                        <SkeletonProfile />
                        : null
        }
        </>
    )
};

export default Skeleton;
