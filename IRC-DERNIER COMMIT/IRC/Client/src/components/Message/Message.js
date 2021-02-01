import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';


const Message = ({message: { text, user }, nickname, oldNicknames}) => {

    let isSentByCurrentUser = false;

  /*  const trimmedNickname = nickname.trim().toLowerCase();*/

    if(user === nickname || oldNicknames.includes(user)){
        isSentByCurrentUser=true;
    }


    return (
        isSentByCurrentUser
            ? (
                <div className="messageMainContainer justifyEnd">
                    <p className="currentNickname">{nickname}</p>
                    <div className="messageSubContainer currentUserBackground">
                        <p className="messageContent whiteText">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageMainContainer justifyStart">
                    <div className="messageSubContainer otherUserBackground">
                        <p className="messageContent greyText">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className="otherUserNickname">{user}</p>
                </div>
            )
    )
}
export default Message;
