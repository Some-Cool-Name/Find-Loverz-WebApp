import React from 'react';
import './Chat.css';


function Message({ text, isMe, time }) {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +'-'+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(time.length);
    console.log(date);

    // Length of date is 19 (YYYY-MM-DD-HH:MM:SS)
    // year: [0][1][2][3]
    let ty = parseInt(time[0] + time[1] + time[2] + time[3]);
    let dy = today.getFullYear();

    // month: [5][6]
    let tm = parseInt(time[5] + time[6]);
    let dm = today.getMonth() +1;

    // day: [8][9]
    let td = parseInt(time[8] + time[9]);
    let dd = today.getDate();

    // hours: [11][12]
    let th = parseInt(time[11] + time[12]);
    let dh = today.getHours();

    // min: [14][15]
    let tmn = parseInt(time[14] + time[15]);
    let dmn = today.getMinutes()

    // sec: [17][18]
    let ts = parseInt(time[17] + time[18]);
    let ds = today.getSeconds();

    let timestamp = "none";
    //dy = 10;
    // --------- Same year ---------
    if (ty == dy){
        // --------- Same month ---------
        if (tm == dm){
             // --------- Same day ---------
            if (td == dd){
                 // --------- Same hour ---------
                if (th == dh){
                     // --------- Same min ---------
                    if (tmn == dmn){
                        timestamp = "a few seconds ago";
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
