import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';
import './Messages.css';

const Messages = ({messages, nickname}) => {

    return(
        <ScrollToBottom>
            {messages.map((message, i) => <div key={i}><Message message={message} nickname={nickname}/></div>)}
        </ScrollToBottom>
    )
}

export default Messages;