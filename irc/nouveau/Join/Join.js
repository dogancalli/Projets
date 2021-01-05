import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Join.css';

const Join = () => {
    const [nickname, setNickname] = useState('');
    const [channel, setChannel] = useState('');
    
    return (
        <div>
            <h1>Enter your nickname and the channel of your choice.</h1>
            <input placeholder="Nickname" type="text" onChange={(e) => setNickname(e.target.value)}/>
            <input placeholder="Channel" type="text" onChange={(e) => setChannel(e.target.value)}/>
            <Link onClick={e => (!nickname || !channel) ? e.preventDefault() : null} to={`/chat?nickname=${nickname}&channel=${channel}`}>
            <button type="submit">Join</button>
            </Link>
        </div>
        
    );
}

export default Join;