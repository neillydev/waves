import React, { useState, useRef } from 'react';

require('./Upload.css');

enum AccessType {
    public,
    friends,
    private
};

const Upload = () => {
    const [caption, setCaption] = useState('');

    const mediaFile = useRef<HTMLInputElement>(null);

    const [access, setAccess] = useState(AccessType.public);


    const handlePost = () => {
        
    };

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
                    <div className="uploadMediaWrapper" 
                            onClick={() => {
                                if(mediaFile && mediaFile.current){
                                    mediaFile.current.click();
                                }
                            }
                            }>
                        <h4>Upload to Waves</h4>
                        <p>Click or drag and drop a file</p>
                        <input ref={mediaFile} type="file" accept="video/mp4,video/x-m4v,video/*" className="uploadInput" />
                    </div>
                    <div className="formBtnContainer">
                        <button className={`postBtn draftBtn ${caption.length > 0 ? 'enabledBtn' : 'disabledBtn' }`} disabled={caption.length === 0 ? true : false }>
                            Draft
                        </button>
                        <button className={`postBtn ${caption.length > 0 ? 'enabledBtn' : 'disabledBtn' }`} disabled={caption.length === 0 ? true : false } >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Upload;
