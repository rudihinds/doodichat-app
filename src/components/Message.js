import React from 'react'

function Message(props){  
    
        return (
            <div key={props.key} className="message">
                <p className="message-username">{`${props.username}: `}</p>
                <p className="message-text">{props.message}</p>
            </div>
        )
    }


export default Message