

export const handleFetchFollow = (username: string) => {
    return new Promise<void>((resolve, reject) => {
        fetch(`https://neilly.dev/follow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), username: localStorage.getItem("username_cache"), following_username: username })
        })
            .then(res => {
                if (res.status == 200) {
                    resolve();
                }
                else if (res.status == 409) {
                    reject();
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error: ' + error));
    });
};

export const handleDeletePost = (post_id: number) => {
    return new Promise<void>((resolve, reject) => {
        fetch(`https://neilly.dev/post`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: post_id })
        })
            .then(res => {
                if (res.status == 200) {
                    window.location.reload();
                    resolve();
                }
                else if (res.status == 409 || res.status == 400) {
                    //
                    reject();
                }
            })
            .catch(error => console.error('Error: ' + error));
    });
};


export const handlePostComment = (post_id: number, reply_to: number, comment: string) => {
    return new Promise((resolve, reject) => {
        fetch(`https://neilly.dev/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: post_id, comment: comment, reply_to: reply_to ? reply_to : 0 })
        })
            .then(res => {
                if (res.status == 200) {
                    setTimeout(() => res.json().then((json: any) => {
                        resolve(json);
                    }), 300)
                }
                else if (res.status == 409) {
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error: ' + error));
    });
};



export const handleFetchLike = (comment_like: boolean, post_id: number, comment_id?: number) => {
    return new Promise((resolve, reject) => {
        fetch(`https://neilly.dev/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: comment_like ? comment_id : post_id, comment_like: comment_like })
        })
            .then(res => {
                if (res.status == 200) {

                    res.json().then((json: any) => {
                        resolve(json);
                    });
                }
                else if (res.status == 409) {
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error: ' + error));
    });
};

export const handleCheckIfLiked = (post_id: number, comment_id?: number) => {
    return new Promise((resolve, reject) => {
        fetch(`https://neilly.dev/liked`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), user_id: localStorage.getItem("userid_cache"), post_id: comment_id ? comment_id : post_id })
        })
        .then(res => {
            if (res.status == 200) {

                res.json().then((json: any) => {
                    resolve(json);
                });
            }
            else if (res.status == 409) {
                
            }
        })
        .catch(error => console.error('Error: ' + error));
    });
};
