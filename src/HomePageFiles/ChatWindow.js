import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import FeedLeft from './FeedLeft';
import Message from './Message';
import './Chat.css';

function Chat({ user }) {
    const location = useLocation();
    const [otherPersonUserName, setOtherPersonUserName] = useState('Loading..');
    const [messages, setMessages] = useState([
        {message: 'hey\n', time: '2021-08-21T19:02:33', user: 'mudau'}, 
        {message: 'hello, how are you?\n', time: '2021-08-21T19:02:40', user: 'begin'}
    ]);

    /*useEffect(() => {
        setOtherPersonUserName(location.state.otherPersonUserName);
    }, [])*/

    return (
        <div className="chat-window">
            <div className="chat-top">
                <div className="chat-details">
                    <div className = "chat-profile-picture"><img src = {user[0].profile_picture} alt="" /> </div>
                
                    <div className="chat-profile-name">
                        <p id="chat-username">{user[0].username}</p>                          
                    </div>
                </div>

                <div className="chat-buttons-container">
                    <button className="chat-buttons" id="chat-search-button"><i class="uil uil-search"></i></button>
                    <button className="chat-buttons" id="chat-options-button"><i class="uil uil-ellipsis-h"></i></button>          
                </div>
            </div>

            <div className="chat-body">
                <div className="chat-incomming">
                    <p className="chat-message">Chat bubble me</p>
                    <p className="chat-time">20:25</p>
                </div>

                <div className="chat-outgoing">
                    <p className="chat-message">Chat bubble not me</p>
                    <p className="chat-time">20:25</p>
                </div>
            </div>

            <div className="chat-bottom">
                <input id="message-box" type="text" placeholder="Type a message"></input>
                <div id="message-send" type="button"><i class="uil uil-message"></i></div>
            </div>
        </div>
    )
}

export default Chat
