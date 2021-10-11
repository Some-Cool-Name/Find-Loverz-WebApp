import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import FeedLeft from './FeedLeft';
import Message from './Message';
import moment from 'moment';
import { getFromStorage } from '../HelperClasses/StorageHandler';
import './Chat.css';
import NavBar from './NavBar';

function Chat({ user, setUser, db }) {
    // we will use this to scroll to bottom of chat on page-reload and after sending a message
    const dummy = useRef();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    let otherPersonUserName = getFromStorage('otherPersonUsername');

    const scrollToBottom = () => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    const sendMessage = () => {
        let now = new Date();
        let dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');
        // Output of dateString: 2020-07-21 07:24:06

        db.ref(`${user[0].username}_${otherPersonUserName}`)
          .push({
            message: text,
            time: dateStringWithTime,
            user:user[0].username,
            image_url: "",
          })
          .then(() => {
            // do nothing for now
        });

        db.ref(`${otherPersonUserName}_${user[0].username}`)
          .push({
            message:text,
            time: dateStringWithTime,
            user:user[0].username,
            image_url: "",
          })
          .then(() => {
            // reset things
        });
        setText("");
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    const handleChange = (e) => {
        setText(e.target.value);
    }


    useEffect(() => {
        if(getFromStorage('otherPersonUsername')){
            console.log('me: ', user[0].username);
            console.log('other person: ', getFromStorage('otherPersonUsername'));
            db.ref(`${user[0].username}_${getFromStorage('otherPersonUsername')}`).on("value", snapshot => {
                let allMessages = [];
                snapshot.forEach(snap => {
                    allMessages.push(snap.val());
                });
                setMessages(allMessages);
            });
            scrollToBottom();
        }
    }, []);

    // useFocusEffect(
    //     React.useCallback(() => {
    //       const unsubscribe = API.subscribe(userId, user => setUser(data));
    
    //       return () => unsubscribe();
    //     }, [userId])
    //   );

    // scrollToBottom();

    if(!getFromStorage('otherPersonUsername')){
        return(
            <React.Fragment>
                <FeedLeft user={user} setUser={setUser} />
                <div className="chat-window">
                    <NavBar user={user} setUser={setUser}/>
                    <h1 style={{color: 'gray', marginTop: 200}}>
                        Select a user to chat to on <br/>
                        the matches section (on your left).
                    </h1>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <FeedLeft user={user} setUser={setUser} />
            <div className="chat-window">
                <NavBar user={user} setUser={setUser}/>
                <div className="chat-top">
                    <div className="chat-details">
                        <div className = "chat-profile-picture"><img src = {getFromStorage('otherImageUrl')} alt="" /> </div>
                    
                        <div className="chat-profile-name">
                            <p id="chat-username">{otherPersonUserName}</p>                          
                        </div>
                    </div>

                    <div className="chat-buttons-container">
                        <button className="chat-buttons" id="chat-search-button"><i class="uil uil-search"></i></button>
                        <button className="chat-buttons" id="chat-options-button"><i class="uil uil-ellipsis-h"></i></button>          
                    </div>
                </div>

                <div className="chat-body">
                            {
                                messages && messages.map((obj) => {
                                    return(
                                            <Message text={obj.message} isMe={obj.user===user[0].username} />
                                    );
                                })
                            }
                    <span ref={dummy}></span>
                </div>

                <div className="chat-bottom">
                    <input 
                        id="message-box" 
                        type="text" 
                        placeholder="Type a message"
                        onChange={handleChange}
                        value={text}
                        ></input>
                    <div id="message-send" type="button" onClick={sendMessage}><i class="uil uil-message"></i></div>
                </div>
                </div>
        </React.Fragment>
    )
}

export default Chat
