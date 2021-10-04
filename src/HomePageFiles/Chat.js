import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import FeedLeft from './FeedLeft';
import Message from './Message';

function Chat({ user }) {
    const location = useLocation();
    const [otherPersonUserName, setOtherPersonUserName] = useState('Loading..');
    const [messages, setMessages] = useState([
        {message: 'hey\n', time: '2021-08-21T19:02:33', user: 'mudau'}, 
        {message: 'hello, how are you?\n', time: '2021-08-21T19:02:40', user: 'begin'}
    ]);

    useEffect(() => {
        setOtherPersonUserName(location.state.otherPersonUserName);
    }, [])

    return (
        <React.Fragment>
            <div className="feed">
                <FeedLeft user={user} />
                <div>
                    <div style={{backgroundColor: 'gray', width: 1030, height: 60}}>
                        <h2>{otherPersonUserName}</h2>
                    </div>
                    <div style={{width: 1030, height: '100%'}}>
                        {
                            messages.map((obj) => {
                                console.log(user);
                                return(
                                        <Message text={obj.message} isMe={obj.user===user[0].username} />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Chat
