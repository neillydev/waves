import React, { useState, useRef, useContext, useEffect } from 'react';

import { LoadingContext } from '../contexts/LoadingContext';

import EditAvatarSVG from '../../svg/edit_avatar.svg';

require('./Settings.css');

enum EditingType {
    USERNAME,
    NAME
}

const Settings = () => {
    const { load_state, loading_dispatch } = useContext(LoadingContext);

    const [editingType, setEditingType] = useState<EditingType>();

    const avatarInput = useRef<HTMLInputElement>(null);
    const [avatarFile, setAvatarFile] = useState<File>();
    const [avatarURI, setAvatarURI] = useState(localStorage.getItem('avatar') || '<none>');

    const usernameInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);

    const handleSendAvatar = () => {
        if (avatarFile) {
            const oldUsername = localStorage.getItem('username_cache');
            const token = localStorage.getItem('token');
            loading_dispatch({ loading: true, type: 'loading_bar' });
            const formData = new FormData();
            formData.append('file', avatarFile);
            formData.append('oldUsername', oldUsername!);
            formData.append('token', token!);
            fetch('https://neilly.dev/avatar', {
                method: 'POST',
                //add auth header here
                body: formData
            })
                .then(res => {
                    if (res) {
                        if (res.status === 200) {
                            res.json().then(json => {
                                localStorage.setItem('avatar', json.url);
                                setAvatarURI(json.url);
                                loading_dispatch({ loading: true, type: 'bar' });
                            });
                        }
                        else if (res.status === 404) {

                        }
                    }
                })
                .catch(error => console.error('Error: ', error));
        }
    };

    const handleFormSubmit = () => {
        loading_dispatch({ loading: true, type: 'loading_bar' });
        setEditingType(undefined);
        const username = usernameInput?.current?.value || localStorage.getItem('username_cache');
        const name = nameInput?.current?.value || localStorage.getItem('name_cache');
        const oldUsername = localStorage.getItem('username_cache');
        const token = localStorage.getItem('token');
        if(avatarFile){
            handleSendAvatar();
        }
        if (oldUsername && token && username && name) {
            fetch('https://neilly.dev/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    username: username,
                    oldUsername: localStorage.getItem('username_cache'),
                    name: name,
                })
            })
                .then(res => {
                    if (res) {
                        if (res.status === 200) {
                            //use json response for these
                            localStorage.setItem('username_cache', username);
                            localStorage.setItem('name_cache', name);
                            //window.location.reload();
                            loading_dispatch({ loading: true, type: 'bar' });
                        }
                        else {

                        }
                    }
                })
                .catch(error => console.error('Error: ', error));
        }
    };

    return (
        <div className="settingsContainer">
            <div className="innerSettingsWrapper">
                <div className="innerSettingsContent">
                    <div className="innerSettingsBlock">
                        <div className="innerSettingsTitle">
                            Profile Settings
                        </div>
                        <div className="avatarSettingsContainer">
                            <span className="avatarSettingsWrapper">
                                <img src={`${avatarURI}`} />
                                <EditAvatarSVG className="editAvatar" onClick={() => {
                                    if (avatarInput && avatarInput.current) {
                                        setEditingType(undefined);
                                        avatarInput.current.click();
                                    }
                                }} />
                                <input ref={avatarInput} type="file" accept={`accept="image/*"`} className="uploadInput" onChange={(event) => {
                                    if (event && event.target && event.target.files) {
                                        let file = event.target.files[0];

                                        if (file) {
                                            setAvatarFile(file);
                                            const reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onload = (event) => {
                                                if (reader?.result) {
                                                    setAvatarURI(reader?.result.toString())
                                                }
                                            } 
                                        }

                                    }
                                }
                                } />
                            </span>
                        </div>
                        <div className="innerSettingsItem">

                            <div className="innerSettingsSubtitle">
                                Username
                            </div>
                            {
                                editingType == EditingType.USERNAME ?
                                    <div className="settingsFormContainer">
                                        <form action="" className="settingsForm" onSubmit={handleFormSubmit}>
                                            <input ref={usernameInput} placeholder={`${localStorage.getItem('username_cache')}`} autoComplete="off" className="settingsInput" />
                                        </form>
                                    </div>
                                    :
                                    <div className="settingsOptionContainer">
                                        <div className="settingsOption">
                                            {localStorage.getItem('username_cache')}
                                        </div>
                                        <div className="manageOption" onClick={() => setEditingType(EditingType.USERNAME)}>
                                            Edit
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className="innerSettingsItem">
                            <div className="innerSettingsSubtitle">
                                Name
                            </div>
                            {
                                editingType == EditingType.NAME ?
                                    <div className="settingsFormContainer">
                                        <form action="" className="settingsForm" onSubmit={handleFormSubmit}>
                                            <input ref={nameInput} placeholder={`${localStorage.getItem('name_cache')}`} autoComplete="off" className="settingsInput" />
                                        </form>
                                    </div>
                                    :
                                    <div className="settingsOptionContainer">
                                        <div className="settingsOption">
                                            {localStorage.getItem('name_cache')}
                                        </div>
                                        <div className="manageOption" onClick={() => setEditingType(EditingType.NAME)}>
                                            Edit
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Settings;
