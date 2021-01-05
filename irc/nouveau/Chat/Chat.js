import React, {useState, useEffect} from 'react';
import './Chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import OnlineUsers from '../OnlineUsers/OnlineUsers';

let socket;

const Chat = ({location}) => {

    const [nickname, setNickname] = useState('');
    const [channel, setChannel] = useState('');
    const [users, setUsers] = useState('');
    const [message, SetMessage] = useState('');
    const [messages, SetMessages] = useState([]);
    const ENDPOINT = "localhost:5000";

    //-----JOIN CHANNEL-------------------------------------------------------------------------------

    useEffect(() => {
        const {nickname, channel} = queryString.parse(location.search); // transforme le requête d'url (?nickname=Test&channel=2)en objet json

        socket = io(ENDPOINT);

        setNickname(nickname);
        setChannel(channel);

       socket.emit("join", { nickname, channel}, () => {

       });

       return () => {
           socket.emit('disconnect');
           socket.off();
       }
    }, [ENDPOINT, location.search])


    //----SEND MESSAGES--------------------------------------------------------------------------------

    useEffect(() => {
        socket.on("message", (message) => {
            SetMessages(messages => [...messages, message]);
        });

    });

    const sendMessage = (e) => {
        e.preventDefault(); // évite que la page se rafraichisse entière
        if(message){
            socket.emit("sendMessage", message, () => SetMessage(""));
            // le callback nettoie après l'envoi du message
        }
    }

    console.log(message, messages);

    return (
        <div>
            <div>
                <InfoBar channel={channel}/>
                <Messages messages={messages} nickname={nickname}/>
                <Input message={message} SetMessage={SetMessage} sendMessage={sendMessage}/>
            </div>
            <OnlineUsers users={users}/>
        </div>
    );
}

export default Chat;