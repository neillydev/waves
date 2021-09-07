import React, { useState } from 'react';

require('./Upload.css');

enum AccessType {
    public,
    friends,
    private
};

const Upload = () => {
    const [charCount, setCharCount] = useState(0);
    const [access, setAccess] = useState(AccessType.public);

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
                                {charCount} / 200
                            </span>
                        </div>
                        <div className="captionFormContainer">
                            <input type="text" className="captionForm" onChange={(event) => charCount < 200 ? setCharCount(event.currentTarget.value.length) : null} disabled={ charCount < 200 ? false : true } />
                        </div>
                    </div>
                    <div className="uploadSettingsContainer">
                        <div className="uploadAccess">
                            <h4>Post viewable to</h4>
                            <div className="uploadAccessRadio">
                                <label className="uploadAccessLabel">
                                    <input type="radio" onClick={() => setAccess(AccessType.public)} />
                                    <span className={`uploadAccessRadioBox ${access === AccessType.public ? 'checked' : '' }`}></span>
                                    Public
                                </label>
                                <label className="uploadAccessLabel">
                                    <input type="radio" onClick={() => setAccess(AccessType.friends)} />
                                    <span className={`uploadAccessRadioBox ${access === AccessType.friends ? 'checked' : '' }`}></span>
                                    Friends
                                </label>
                                <label className="uploadAccessLabel">
                                    <input type="radio" onClick={() => setAccess(AccessType.private)} />
                                    <span className={`uploadAccessRadioBox ${access === AccessType.private ? 'checked' : '' }`}></span>
                                    Private
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="uploadMediaContainer">
                    <div className="uploadMediaWrapper">
                        <h4>Upload to Waves</h4>
                        <p>Click or drag and drop a file</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Upload;
