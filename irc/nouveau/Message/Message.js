import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';

const Message = ({message, nickname}) => {

    let isSentByCurrentUser = false;

    const trimmedNickname = nickname.trim().toLowerCase();

    if(message.user === trimmedNickname){
        isSentByCurrentUser=true;
    }

    return (
        isSentByCurrentUser? (
            <div>
                <p>{trimmedNickname}</p>
                <p>actuel:{ReactEmoji.emojify(message.text)}</p>
            </div>
        ) : (
            <div>
                <p>{message.user}</p>
                <p>autre:{ReactEmoji.emojify(message.text)}</p>
            </div>
        )
    )
}
export default Message;