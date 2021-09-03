import React, { useContext }  from 'react';
import WaveSVG from '../../svg/wave.svg';
import Avatar from '../Avatar/Avatar';

import {AuthContext} from '../contexts/AuthContext';
import {ModalContext} from '../contexts/ModalContext';

require('./NavBar.css');

function NavBar() {
    const { authState } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);
    return (
        <div className='navContainer flex border-b border-gray-200 relative top-0 inset-x-0 z-100 h-16 items-center'>
            <div className="navbarWrapper w-full max-w-screen-xl relative">
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
                    <div className="navSearchContainer">
                        <form action="/search" className="navSearchForm flex items-center relative">
                            <input placeholder="Search creators" type="search" className="" />
                        </form>
                    </div>
                    <div className="navRightBarContainer flex">
                        {
                        authState ? <Avatar /> : <button onClick={() => dispatch( { type: 'true' } )} className="loginBtn rounded-sm border-none">
                            Login
                        </button>
                        }
                        <button onClick={authState ? ()=>null : () => dispatch( { type: 'true' } )} className="uploadBtn border-none">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
