import React from 'react';

import './ChatList.css';
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";

const ChatList = () => {

    return (
        <div>
            <h1 className="mainChatTitle">Chat</h1>
            <ScrollToBottom className="test">
                <div className="ChatListMainContainer">
                    <h3 className="conversationTitle">Conversation 1</h3>
                    <p className="chatListText">Mon premier texte...</p>
                </div>
                <div className="ChatListMainContainer">
                    <h3 className="conversationTitle">Conversation 2</h3>
                    <p className="chatListText">Mon premier texte...</p>
                </div>
                <div className="ChatListMainContainer">
                    <h3 className="conversationTitle">Conversation 3</h3>
                    <p className="chatListText">Mon premier texte...</p>
                </div>
                <div className="ChatListMainContainer">
                    <h3 className="conversationTitle">Conversation 4</h3>
                    <p className="chatListText">Mon premier texte...</p>
                </div>
                <div className="ChatListMainContainer">
                    <h3 className="conversationTitle">Conversation 5</h3>
                    <p className="chatListText">Mon premier texte...</p>
                </div>
                <div className="ChatListMainContainer">
                    <h3 className="conversationTitle">Conversation 6</h3>
                    <p className="chatListText">Mon premier texte...</p>
                </div>
                <div className="ChatListMainContainer">
                    <h3 className="conversationTitle">Conversation 7</h3>
                    <p className="chatListText">Mon premier texte...</p>
                </div>
                <div className="ChatListMainContainer">
                    <h3 className="conversationTitle">Conversation 8</h3>
                    <p className="chatListText">Mon premier texte...</p>
                </div>
                <div className="ChatListMainContainer">
                    <h3 className="conversationTitle">Conversation 9</h3>
                    <p className="chatListText">Mon premier texte...</p>
                </div>
                <div className="ChatListMainContainer">
                    <h3 className="conversationTitle">Conversation 10</h3>
                    <p className="chatListText">Mon premier texte...</p>
                </div>
            </ScrollToBottom>
        </div>
    )
}

export default ChatList;
