
import React from 'react';

import './Input.css';

const Input = ({ sendMessage, SetMessage, message}) => {

    return (
        <form className="formSendMessage">
           <input className="messageBar" type="text" placeholder="Type a message here." value={message} onChange={( {target: {value}}) => SetMessage(value)} onKeyPress={e => e.key === "Enter" ? sendMessage(e) : null} />
            <button className="sendMessageButton" type="submit" onClick={e => sendMessage(e)}>Send</button>
        </form>
    )
}

export default Input;
