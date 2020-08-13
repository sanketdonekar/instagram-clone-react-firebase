import React from 'react'
import '../assets/css/Post.css'
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
    return (
        <div className="post">
            {/* header -> avatar + username */}
            {/* image */}
            {/* username + caption */}
            <div className="post-header">
                <Avatar className="post-avatar" alt="women" src={require('../assets/img/me.jpg')} />
                <h3>
                    {username}
                </h3>
            </div>
            <img className="post-image" src={imageUrl} alt="" />
            <h4 className="post-text"><strong>{username}</strong> {caption} </h4>
        </div >
    )
}

export default Post;