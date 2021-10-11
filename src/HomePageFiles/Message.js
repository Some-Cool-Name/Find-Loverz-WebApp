import React from 'react';
import './Chat.css';


function Message({ text, isMe }) {

    if(isMe){
        return (
            <div className="chat-outgoing">
                <p className="chat-message">{text}</p>
                <p className="chat-time">20:25</p>
            </div>
        ) 
    }

    return (
        <div className="chat-incomming">
            <p className="chat-message">{text}</p>
            <p className="chat-time">20:25</p>
        </div>
    )
}

export default Message
