import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';
import './Messages.css';

const Messages = ({messages, nickname, oldNicknames}) => {

    return(
        <ScrollToBottom className="test">
            {messages.map((message, i) => <div key={i}><Message message={message} nickname={nickname} oldNicknames={oldNicknames}/></div>)}
        </ScrollToBottom>
    )
}

export default Messages;
