import React, { useState, useRef } from 'react';

import EditAvatarSVG from '../../svg/edit_avatar.svg';

require('./Settings.css');

enum EditingType {
    USERNAME,
    NAME
}

const Settings = () => {
    const [editingType, setEditingType] = useState<EditingType>();

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
                                        setEditingType(undefined);
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
                                editingType == EditingType.USERNAME ?
                                    <div className="settingsFormContainer">
                                        <form action="" className="settingsForm">
                                            <input placeholder={`${localStorage.getItem('username_cache')}`} autoComplete="off" className="settingsInput" />
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
                                        <form action="" className="settingsForm">
                                            <input placeholder={`${localStorage.getItem('name_cache')}`} autoComplete="off" className="settingsInput" />
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
