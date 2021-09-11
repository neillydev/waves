import React, { useState, useRef } from 'react';

import EditAvatarSVG from '../../svg/edit_avatar.svg';

require('./Settings.css');

const Settings = () => {
    const [editingName, setEditingName] = useState(false);

    const avatarInput = useRef<HTMLInputElement>(null);
    const [avatarFile, setAvatarFile] = useState();

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
                                        avatarInput.current.click();
                                    }
                                }} />
                                <input ref={avatarInput} type="file" accept={`accept="image/*"`} className="uploadInput" onChange={(event) => {
                                    if (event && event.target && event.target.files) {

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
                                editingName ?
                                    <div className="settingsFormContainer">
                                        <form action="" className="settingsForm">
                                            <input placeholder={`${localStorage.getItem('username_cache')}`} autoComplete="off" className="nameInput" />
                                        </form>
                                    </div>
                                    :
                                    <div className="settingsOptionContainer">
                                        <div className="settingsOption">
                                            {localStorage.getItem('username_cache')}
                                        </div>
                                        <div className="manageOption">
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
                                editingName ?
                                    <div className="settingsFormContainer">
                                        <form action="" className="settingsForm">
                                            <input placeholder={`${localStorage.getItem('name_cache')}`} autoComplete="off" className="nameInput" />
                                        </form>
                                    </div>
                                    :
                                    <div className="settingsOptionContainer">
                                        <div className="settingsOption">
                                            {localStorage.getItem('name_cache')}
                                        </div>
                                        <div className="manageOption">
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
