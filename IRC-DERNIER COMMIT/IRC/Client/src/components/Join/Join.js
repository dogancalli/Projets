import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Join.css';
import chatIcon from './chatIconViolet.png';

const Join = () => {
    const [nickname, setNickname] = useState('');
    const [channel, setChannel] = useState('');

    return (
        <div className="mainJoinContainer">
            <div className="leftJoinOuterContainer">
               <div className="leftInnerContainer">
                   <img src={chatIcon} className="chatIcon"/>
                   <h1 className="IRCTitle">IRC</h1>
               </div>
                <h2 className="IrcSubtitle">Partagez en temps réel et en toute liberté avec vos amis.</h2>
            </div>

            <div className="JoinouterContainer">
                <div className="intermediateRight">
                    <h2 className="joinTitle">Rejoins le chat ! </h2>
                    <div className="innerContainer">
                        <input className="joinInput" placeholder="Surnom" type="text" onChange={(e) => setNickname(e.target.value)}/>
                        <input className="joinInput" placeholder="Channel" type="text" onChange={(e) => setChannel(e.target.value)}/>
                        <Link onClick={e => (!nickname || !channel) ? e.preventDefault() : null} to={`/chat?nickname=${nickname}&channel=${channel}`}>
                            <button className="JoinButton" type="submit">Rejoindre</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>


    );
}

export default Join;
