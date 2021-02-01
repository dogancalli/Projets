import React, {useState, useEffect} from 'react';
import './Chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import ChatList from "../ChatList/ChatList";
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import profilIconBlanc from './profilIconBlanc.png';


let socket;

const Chat = ({location}) => {

    const [oldNicknames, setOldNicknames] = useState([]);
    const [nickname, setNickname] = useState('');
    const [channel, setChannel] = useState('');
    const [users, setUsers] = useState('');
    const [message, SetMessage] = useState('');
    const [messages, SetMessages] = useState([]);
    // const [input, setInput] = useState('');
    const ENDPOINT = "localhost:5000";

    //-----JOIN CHANNEL-------------------------------------------------------------------------------

    useEffect(() => {
        const {nickname, channel} = queryString.parse(location.search); // transforme le requête d'url (?nickname=Test&channel=2)en objet json

        socket = io(ENDPOINT);

        setNickname(nickname);
/*        setOldNicknames(nickname);*/
        setChannel(channel);

        socket.emit("join", { nickname, channel}, (error) => {
            if(error){
                alert(error);
            }
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
        socket.on("channelData", ({users}) => {
            setUsers(users);
        });
        socket.on("newNickname", (user) => {
            setOldNicknames(user.oldNicknames);
            setNickname(user.nickname);
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault(); // évite que la page se rafraichisse entière
        if(message){
            socket.emit("sendMessage", message, () => SetMessage(""));
            // le callback nettoie après l'envoi du message
        }
    }

    // console.log(message, messages);
    console.log('render');

    return (
        <div className="mainChatContainer">
            <div className="chatLeftContainer">
                <img src={profilIconBlanc} className="profilIcon"/>
                <p className="chatLeftText">{nickname}</p>
                <button>Accueil</button>
            </div>
            <div className="chatListContainer">
                <ChatList/>
            </div>
            <div className="chatRightContainer">
                <div className="chatWindow">
                    <InfoBar channel={channel}/>
                    <Messages messages={messages} nickname={nickname} oldNicknames={oldNicknames}/>
                    <Input message={message} SetMessage={SetMessage} sendMessage={sendMessage}/>
                </div>
            </div>
        </div>
    );
}
   /*setOldNicknames(oldNicknames => [...oldNicknames, nickname]);*/

export default Chat;
