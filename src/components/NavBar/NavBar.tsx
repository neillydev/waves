import React, { useContext, useState }  from 'react';
import WaveSVG from '../../svg/wave.svg';
import Avatar from '../Avatar/Avatar';

import {AuthContext} from '../contexts/AuthContext';
import {ModalContext} from '../contexts/ModalContext';
import SearchDropdown from '../SearchDropdown/SearchDropdown';

import { Link } from 'react-router-dom';

require('./NavBar.css');

function NavBar() {
    const { authState } = useContext(AuthContext);
    const { dispatch } = useContext(ModalContext);

    const [searchTyping, setSearchTyping] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const [username, setUsername] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);

    const handleSearch = (usernameValue: string) => {
        fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usernameValue })
        })
            .then(res => {
                if (res) {
                    if (res.status === 200) {
                        res.json().then(json => {
                            setUsername(json.user_profile.username);
                            setName(json.user_profile.name);
                            setAvatar(json.user_profile.avatar);
                        });
                    }
                    else if (res.status === 404) {
                        setUsername(null);
                        setName(null);
                        setAvatar(null);
                    }
                }
            })
            .then(response => console.log('Success: ', response))
            .catch(error => console.error('Error: ', error));
    };

    const handleSearchTyping = (searchTyping: boolean) => {
        setSearchValue("");
        setSearchTyping(searchTyping);
    };

    return (
        <div className='navContainer flex border-b border-gray-200 top-0 inset-x-0 z-100 h-16 items-center'>
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
                            <input placeholder="Search creators" autoComplete="off" type="search" value={searchValue} className="waveSearch" onChange={(event) => {
                                if(event.currentTarget.value.length > 0) {
                                    setSearchTyping(true);
                                    setSearchValue(event.currentTarget.value);

                                    handleSearch(event.currentTarget.value);
                                }
                                else{
                                    setSearchValue("");
                                    setSearchTyping(false);
                                    setUsername(null);
                                    setName(null);
                                    setAvatar(null);
                                }
                            }} />
                            { searchTyping ? 
                                <div onClick={() => { setSearchValue(""); setSearchTyping(false); }}>
                                    <svg width="16" height="16" viewBox="0 0 48 48" fill="rgba(22, 24, 35, 0.34)" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 46C36.1503 46 46 36.1503 46 24C46 11.8497 36.1503 2 24 2C11.8497 2 2 11.8497 2 24C2 36.1503 11.8497 46 24 46ZM15.1466 30.7323L21.8788 24.0001L15.1466 17.2679C14.756 16.8774 14.756 16.2442 15.1466 15.8537L15.8537 15.1466C16.2442 14.756 16.8774 14.756 17.2679 15.1466L24.0001 21.8788L30.7323 15.1466C31.1229 14.756 31.756 14.756 32.1466 15.1466L32.8537 15.8537C33.2442 16.2442 33.2442 16.8774 32.8537 17.2679L26.1214 24.0001L32.8537 30.7323C33.2442 31.1229 33.2442 31.756 32.8537 32.1466L32.1466 32.8537C31.756 33.2442 31.1229 33.2442 30.7323 32.8537L24.0001 26.1214L17.2679 32.8537C16.8774 33.2442 16.2442 33.2442 15.8537 32.8537L15.1466 32.1466C14.756 31.756 14.756 31.1229 15.1466 30.7323Z"></path>
                                        </svg>
                                    </div> 
                                : 
                                null }
                        </form>
                        { searchTyping ? 
                            <SearchDropdown username={username} name={name} avatar={avatar} handleSearchTyping={handleSearchTyping} /> 
                            :
                            null }
                    </div>
                    <div className="navRightBarContainer flex">
                        {
                        authState ? <Avatar /> : <button onClick={() => dispatch( { type: 'true' } )} className="loginBtn rounded-sm border-none">
                            Login
                        </button>
                        }
                        <Link to={authState ? "/upload" : "/"} onClick={authState ? ()=>null : () => dispatch( { type: 'true' } )} className="uploadBtn border-none">
                            +
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
