import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';

const Message = ({message: { text, user }, nickname}) => {

    let isSentByCurrentUser = false;

    const trimmedNickname = nickname.trim().toLowerCase();

    if(user === trimmedNickname){
        isSentByCurrentUser=true;
    }

    return (
        isSentByCurrentUser? (
            <div>
                <p>{trimmedNickname} : {ReactEmoji.emojify(text)}</p>
            </div>
        ) : (
            <div>
                <p>{user} : {ReactEmoji.emojify(text)}</p>
            </div>
        )
    )
}
export default Message;