import React from 'react';

import './Input.css';

const Input = ({ sendMessage, SetMessage, message}) => {

    return (
        <form>
           <input type="text" placeholder="Type a message here." value={message} onChange={( {target: {value}}) => SetMessage(value)} onKeyPress={e => e.key === "Enter" ? sendMessage(e) : null} />
            <button type="submit" onClick={e => sendMessage(e)}>Send</button>
        </form>
    )
}

export default Input;