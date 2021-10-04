import React from 'react'

function Message({ text, isMe }) {

    if(isMe){
        return (
            <div style={{marginTop: 20, marginBottom: 20, width: '100%'}}>
                <p style={{float: 'right', backgroundColor: 'black', color: 'white'}}>{text}</p><br/>
            </div>
        ) 
    }

    return (
        <div style={{marginTop: 20, marginBottom: 20, width: '100%'}}>
            <p style={{float: 'left', backgroundColor: 'gray', color: 'black'}}>{text}</p><br/>
        </div>
    )
}

export default Message
