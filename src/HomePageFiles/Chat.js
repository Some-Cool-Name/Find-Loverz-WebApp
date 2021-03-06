import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import FeedLeft from './FeedLeft';
import Message from './Message';
import moment from 'moment';
import { getFromStorage, saveToStorage } from '../HelperClasses/StorageHandler';
import './Chat.css';
import NavBar from './NavBar';

function Chat({ user, setUser, db, otherUser, setOtherUser, isTest }) {
    // we will use this to scroll to bottom of chat on page-reload and after sending a message
    const dummy = useRef();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    let ur = "";
    let done = false;
    // let otherPersonUserName = getFromStorage('otherPersonUsername');
    const [file, setFile] = useState(null);
    const cloudinary = 'https://api.cloudinary.com/v1_1/dkctv74ue/image/upload';
    const scrollToBottom = () => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    const handleImage = async (images, e) => {
        for (let image of images) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "gbu8evn2");

            const resp = await fetch(cloudinary, {
                body: formData,
                method: 'POST'
            })
            await resp.json().then((respJSON) => {
                //saveToStorage('image_url', respJSON.secure_url);


                ur = respJSON.secure_url;
                setImg(ur);
            });
        }
    }

    const sendImage = async (images, _callback) => {

        await handleImage(images)
        // const te = getFromStorage('image_url')
        // console.log(getFromStorage('image_url'))
        // setImg(getFromStorage("image_url"));
        console.log(ur)

        return ur;

    }

    const sendMessage = async (images) => {
        let ln = await sendImage(images)
        setImg(ln);
        console.log(ln);
        let now = new Date();
        let dateStringWithTime = moment(now).format('YYYY-MM-DD HH:mm:ss');
        // Output of dateString: 2020-07-21 07:24:06
        console.log(img)

        db.ref(`${user[0].username}_${otherUser}`)
            .push({
                message: text,
                time: dateStringWithTime,
                user: user[0].username,
                image_url: ln,
            })
            .then(() => {
                // do nothing for now
            });

        db.ref(`${otherUser}_${user[0].username}`)
            .push({
                message: text,
                time: dateStringWithTime,
                user: user[0].username,
                image_url: img,
            })
            .then(() => {
                // reset things
                console.log("url here")
                console.log(ur)
            });
        setText("");

        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    const handleChange = (e) => {
        setText(e.target.value);
    }


    useEffect(() => {
        if (otherUser && !isTest) {
            db.ref(`${user[0].username}_${otherUser}`).on("value", snapshot => {
                let allMessages = [];
                snapshot.forEach(snap => {
                    allMessages.push(snap.val());
                });
                setMessages(allMessages);
            });
            scrollToBottom();
        }
    }, [otherUser]);

    // useFocusEffect(
    //     React.useCallback(() => {
    //       const unsubscribe = API.subscribe(userId, user => setUser(data));

    //       return () => unsubscribe();
    //     }, [userId])
    //   );

    // scrollToBottom();

    if (!otherUser) {
        return (
            <React.Fragment>
                <NavBar user={user} setUser={setUser} />
                <FeedLeft user={user} setUser={setUser} setOtherUser={setOtherUser} />
                <div className="chat-window">

                    <h1 style={{ color: 'gray', marginTop: 200 }}>
                        Select a user to chat to on <br />
                        the matches section (on your left).
                    </h1>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <NavBar user={user} setUser={setUser} />
            {
                !isTest &&
                <FeedLeft user={user} setUser={setUser} setOtherUser={setOtherUser} />
            }
            <div className="chat-window">

                <div className="chat-top">
                    <div className="chat-details">
                        {/* <div className = "chat-profile-picture"><img src = {getFromStorage('')} alt="" /> </div> */}

                        <div className="chat-profile-name">
                            <p id="chat-username">{otherUser}</p>
                        </div>
                    </div>

                    <div className="chat-buttons-container">
                        <button className="chat-buttons" id="chat-search-button"><i className="uil uil-search"></i></button>
                        <button className="chat-buttons" id="chat-options-button"><i className="uil uil-ellipsis-h"></i></button>
                    </div>
                </div>

                <div className="chat-body">
                    {
                        messages && messages.map((obj) => {
                            return (
                                
                                <Message text={obj.message} isMe={obj.user === user[0].username} time={obj.time} url={obj.image_url} />
                                
                            );
                            
                        })
                        
                    }
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
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

                    <div  id="upload-container">
                    <input
                        
                        type="file"
                        id="chat-fileupload"
                        accept="image/*"
                        ref={fileInputEl => setFile(fileInputEl)}
                    ></input>
                    </div>
                    <div id="message-send" type="button" onClick={() => sendMessage(file.files)}><i className="uil uil-message"></i></div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Chat
