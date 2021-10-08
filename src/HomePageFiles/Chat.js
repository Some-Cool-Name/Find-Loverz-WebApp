import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import FeedLeft from './FeedLeft';
import Message from './Message';
import moment from 'moment';
import { getFromStorage } from '../HelperClasses/StorageHandler';
import { v4 as uuidv4 } from 'uuid';

function Chat({ user, setUser, db }) {
    // we will use this to scroll to bottom of chat on page-reload and after sending a message
    // const dummy = useRef();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    let otherPersonUserName = getFromStorage('otherPersonUsername');

    // const scrollToBottom = () => {
    //     dummy.current.scrollIntoView({ behavior: 'smooth' });
    // }

    const sendMessage = () => {
        let now = new Date();
        let dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');
        // Output of dateString: 2020-07-21 07:24:06

        let key = uuidv4();

        db.ref(`${user[0].name}_${otherPersonUserName}/${key}`)
          .set({
            message: text,
            time: dateStringWithTime,
            user:user[0].username,
            image_url: "",
          })
          .then(() => {
            // do nothing
        });

        db.ref(`${otherPersonUserName}_${user[0].name}/${key}`)
          .set({
            message:text,
            time: dateStringWithTime,
            user:user[0].username,
            image_url: "",
          })
          .then(() => {
            // reset things
        });
        setText("");
    }

    const handleChange = (e) => {
        setText(e.target.value);
    }


    useEffect(() => {
        // console.log("name2: ", getFromStorage('otherPersonUsername'));
        // otherPersonUserName = getFromStorage('otherPersonUsername');
        db.ref(`${user[0].name}_${getFromStorage('otherPersonUsername')}`).on("value", snapshot => {
            let allMessages = [];
            snapshot.forEach(snap => {
                allMessages.push(snap.val());
            });
            setMessages(allMessages);
        });
    }, []);

    return (
        <React.Fragment>
            <div className="feed">
                <FeedLeft user={user} setUser={setUser} />
                <div>
                    <div style={{backgroundColor: 'gray', width: 1030, height: 60}}>
                        <h2>{otherPersonUserName}</h2>
                    </div>
                    <div style={{width: 1010, height: '100%'}}>
                        {
                            messages && messages.map((obj) => {
                                return(
                                        <Message text={obj.message} isMe={obj.user===user[0].name} />
                                );
                            })
                        }
                    </div>
                    <div>
                        <input
                            onChange={handleChange}
                            value={text}
                        />
                        <button 
                            onClick={sendMessage}
                            >
                            send
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Chat
