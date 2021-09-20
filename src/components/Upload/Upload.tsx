import React, { useState, useRef, useEffect, useContext } from 'react';

import { LoadingContext } from '../contexts/LoadingContext';

import { Redirect, useHistory } from 'react-router-dom';

require('./Upload.css');

enum AccessType {
    public,
    friends,
    private
};

const Upload = () => {
    const history = useHistory();

    const { load_state, loading_dispatch } = useContext(LoadingContext);

    const [caption, setCaption] = useState('');

    const mediaInput = useRef<HTMLInputElement>(null);
    const [mediaPreview, setMediaPreview] = useState('');
    const [mediaFile, setMediaFile] = useState<File>();
    const [access, setAccess] = useState(AccessType.public);
    const handleSendPreview = () => {
        if (mediaFile) {
            loading_dispatch({ type: 'false' });
            const formData = new FormData();
            formData.append('file', mediaFile);
            fetch('http://localhost:3000/preview', {
                method: 'POST',
                //add auth header here
                body: formData
            })
                .then(res => {
                    if (res) {
                        if (res.status === 200) {
                            res.json().then(json => {
                                setMediaPreview(json.url);
                                loading_dispatch({ type: 'true' });
                            });
                        }
                        else if (res.status === 404) {

                        }
                    }
                })
                .catch(error => console.error('Error: ', error));
        }
    };

    const handlePost = () => {
        return new Promise((resolve, reject) => {
            if (mediaFile) {
                const userID = localStorage.getItem('userid_cache');
                const username = localStorage.getItem('username_cache');
                const token = localStorage.getItem('token');
                fetch('http://localhost:3000/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        file: mediaPreview,
                        caption: caption,
                        access: access,
                        username: username,
                        userID: userID,
                        token: token
                    })
                })
                    .then(res => {
                        if (res) {
                            if (res.status === 201) {
                                resolve('');
                            }
                            else if (res.status === 404) {
                                reject();
                            }
                            else{
                                reject();
                            }
                        }
                    })
                    .catch(error => console.error('Error: ', error));
            }
        });
    };

    useEffect(() => {
        handleSendPreview();
    }, [mediaFile])

    return (
        <div className="uploadContainer">
            <div className="uploadHeader">
                <h4>Upload</h4>
            </div>
            <div className="uploadContent">
                <div className="uploadForm">
                    <div className="captionContainer">
                        <div className="captionHeaderWrapper">
                            <span className="captionHeader">
                                Caption
                            </span>
                            <span className="captionLimit">
                                {caption.length} / 200
                            </span>
                        </div>
                        <div className="captionFormContainer">
                            <input type="text" className="captionForm" onChange={(event) => caption.length < 200 ? setCaption(event.currentTarget.value) : null} disabled={caption.length < 200 ? false : true} />
                        </div>
                    </div>
                    <div className="uploadSettingsContainer">
                        <div className="uploadAccess">
                            <h4>Post viewable to</h4>
                            <div className="uploadAccessRadio">
                                <label className="uploadAccessLabel">
                                    <input type="radio" onClick={() => setAccess(AccessType.public)} />
                                    <span className={`uploadAccessRadioBox ${access === AccessType.public ? 'checked' : ''}`}></span>
                                    Public
                                </label>
                                <label className="uploadAccessLabel">
                                    <input type="radio" onClick={() => setAccess(AccessType.friends)} />
                                    <span className={`uploadAccessRadioBox ${access === AccessType.friends ? 'checked' : ''}`}></span>
                                    Friends
                                </label>
                                <label className="uploadAccessLabel">
                                    <input type="radio" onClick={() => setAccess(AccessType.private)} />
                                    <span className={`uploadAccessRadioBox ${access === AccessType.private ? 'checked' : ''}`}></span>
                                    Private
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="uploadMediaContainer">
                    <div className={`uploadMediaMask ${mediaFile ? '' : 'mediaDisabled'}`}>
                        <video src={mediaPreview.length > 0 ? mediaPreview : ''} autoPlay preload="auto" playsInline loop className="mediaPreview"
                            onLoadedData={(event) => event.currentTarget.play()}>
                        </video>
                    </div>
                    <div className={`uploadMediaWrapper ${mediaFile ? 'mediaDisabled' : ''}`}
                        onClick={() => {
                            if (mediaInput && mediaInput.current) {
                                mediaInput.current.click();
                            }
                        }
                        }>
                        <h4>Upload to Waves</h4>
                        <p>Click or drag and drop a file</p>
                        <input ref={mediaInput} type="file" accept="video/mp4,video/x-m4v,video/*" className="uploadInput" onChange={(event) => {
                            if (event && event.target && event.target.files) {
                                console.log(event.target.files[0]);
                                setMediaFile(event.target.files[0]);
                            }
                        }
                        } />
                    </div>
                    <div className="formBtnContainer">
                        <button className={`postBtn draftBtn ${caption.length > 0 ? 'enabledBtn' : 'disabledBtn'}`} disabled={caption.length === 0 ? true : false}>
                            Draft
                        </button>
                        <button className={`postBtn ${caption.length > 0 ? 'enabledBtn' : 'disabledBtn'}`} disabled={caption.length === 0 ? true : false} onClick={() => {
                            handlePost()
                            .then(json => {
                                history.push('/');
                            })
                            .catch(error => {

                            });
                        }} >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Upload;
