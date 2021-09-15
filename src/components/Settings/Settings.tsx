import React, { useState, useRef, FormEventHandler } from 'react';

import EditAvatarSVG from '../../svg/edit_avatar.svg';

require('./Settings.css');

enum EditingType {
    USERNAME,
    NAME
}

const Settings = () => {
    const [editingType, setEditingType] = useState<EditingType>();

    const avatarInput = useRef<HTMLInputElement>(null);
    const [avatarFile, setAvatarFile] = useState('<none>');

    const usernameInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);

    const handleFormSubmit = (e: HTMLFormElement) => {
        e.preventDefault();
        setEditingType(undefined);
        const username = usernameInput?.current?.value || localStorage.getItem('username_cache');
        const name = nameInput?.current?.value || localStorage.getItem('name_cache');
        const oldUsername = localStorage.getItem('username_cache');
        const token = localStorage.getItem('token');

        
        if (oldUsername && token && username && name && avatarFile) {
            fetch('http://localhost:3000/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    avatar: avatarFile,
                    username: username,
                    oldUsername: localStorage.getItem('username_cache'),
                    name: name,
                })
            })
                .then(res => {
                    if (res) {
                        if (res.status === 200) {

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
                                <img src={`${localStorage.getItem('avatar')}`} />
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
                                            const reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onload = (event) => {
                                                if (reader?.result) {
                                                    setAvatarFile(reader.result.toString());
                                                }
                                            }
                                            reader.readAsBinaryString(file);
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
