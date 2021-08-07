import React from 'react';
import WaveSVG from '../../svg/wave.svg';

require('./NavBar.css');

function NavBar() {
    return (
        <div className='navContainer flex border-b border-gray-200 relative top-0 inset-x-0 z-100 h-16 items-center'>
            <div className="w-full max-w-screen-xl relative mx-auto px-6">
                <div className="navHeaderContainer flex items-center justify-between">
                    <div className="navTitleContainer">
                        <div className="flex items-center">
                            <a href="/" className="block lg:mr-4">
                                <WaveSVG className='replaceThis w-auto md:block h-9' />
                            </a>
                            <h1 className="navTitle text-3xl">
                                waves
                            </h1>
                        </div>
                    </div>
                    <div className="navSearchContainer flex flex-grow min-w-0 lg:w-3/4 xl:w-4/5">
                        <div className="w-full min-w-0 lg:px-6 xl:w-3/4 xl:px-12 relative">
                            <form action="/search" className="transition-colors duration-100 ease-in-out text-gray-600 py-2 pr-4 pl-10 block w-full appearance-none leading-normal border border-transparent rounded-lg focus:outline-none text-left select-none truncate focus:bg-white focus:border-gray-300 bg-gray-200">
                                <input placeholder="Search creators" type="search" className="w-full bg-transparent outline-none" />
                            </form>
                        </div>
                    </div>
                    <div className="navLoginContainer flex">
                        <button className="loginBtn rounded-sm border-none">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
