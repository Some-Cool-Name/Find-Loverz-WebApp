import React from 'react';
import './Chat.css';


function Message({ text, isMe, url, time}) {
    var today = new Date();
    console.log(time)
    
    // --------- Store time as integers in an array ---------
    let t = [];
    let temp = "";
    
    for (let i = 0; i < time.length; ++i){
        if ((time[i] == '-') || (time[i] == ' ') || (time[i] == ':')){ 
            t.push(parseInt(temp));
            temp = "";
        }

        else{
            temp += time[i]; 
        }   
    }

    t.push(parseInt(temp));
    temp = "";

    // --------- year ---------
    let ty = t[0];
    let dy = today.getFullYear();

    // --------- month ---------
    let tm =t[1];
    let dm = today.getMonth() +1;

    // --------- day ---------
    let td = t[2];
    let dd = today.getDate();

    // --------- hours ---------
    let th = t[3];
    let dh = today.getHours();

    // --------- min ---------
    let tmn = t[4];
    let dmn = today.getMinutes()

    let timestamp = "none";

    // --------- Same year ---------
    if (ty == dy){
        // --------- Same month ---------
        if (tm == dm){
             // --------- Same day ---------
            if (td == dd){
                 // --------- Same hour ---------
                if (th == dh){
                     // --------- Same min ---------
                    if (dmn == tmn){
                        timestamp = "just now";
                    }

                    // --------- Different min ---------
                    else{
                        let xmn = (dmn - tmn);
            
                        if (xmn == 1){  
                            timestamp = (xmn + " minute ago");
                        }
    
                        else{
                            timestamp = (xmn + " minutes ago");
                        }
                    }
                }

                // --------- Different hour ---------
                else{
                    let xh = (dh - th);
            
                    if (xh == 1){  
                        timestamp = (xh + " hour ago");
                    }
    
                    else{
                        timestamp = (xh + " hours ago");
                    }
                }
            }

            // --------- Different day ---------
            else{
                let xd = (dd - td);
            
                if (xd == 1){  
                    timestamp = (xd + " day ago");
                }
    
                 else if (xd < 7){
                    timestamp = (xd + " days ago");
                }

                else{
                    timestamp = time;
                }
            }
        }

        // --------- Different month ---------
        else{
            timestamp = time;
        }
    }

    // --------- Different year ---------
    else{
        timestamp = time;
    }

    if(isMe){
        return (
            <div className="chat-outgoing">
                
                {url !== "" &&
                <img src={url}></img>
                
                
                }
                <p className="chat-message">{text}</p>
                <p className="chat-time">{timestamp}</p>
            </div>
        ) 
    }

    return (
        <div className="chat-incomming">
            <p className="chat-message">{text}</p>
            <p className="chat-time">{timestamp}</p> 
        </div>
    )
}

export default Message
