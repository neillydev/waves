import React from 'react';
import WaveSVG from '../../svg/wave.svg';

require('./NavBar.css');

function NavBar() {
    return (
        <div className='navContainer flex border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center'>
            <div className="w-full max-w-screen-xl relative mx-auto px-6">
                <div className="flex items-center">
                    <div className="xl:w-1/5 lg:w-1/4 pl-6 pr-6 lg:pr-8">
                        <div className="flex items-center">
                            <a href="/" className="block lg:mr-4">
                                <WaveSVG className='w-auto md:block h-10' />
                            </a>
                            <h1 className="navTitle text-3xl">
                                waves
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
