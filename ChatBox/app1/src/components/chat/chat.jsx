import React, { useEffect, useState } from 'react'
import { user } from "../join/join";
import socketIo from "socket.io-client";
import "./chat.css";
import sendLogo from "../../images/send.png";
import Message from "../message/message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

let socket;

const ENDPOINT = "http://localhost:4500";

const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    console.log(messages);
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            setId(socket.id);

        })
        console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages(prevMessages => [...prevMessages, data]); // Used functional update for setMessages

            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            // setMessages(prevMessages => [...prevMessages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            // setMessages(prevMessages => [...prevMessages, data]);
            console.log(data.user, data.message)
        })

        return () => {
            socket.emit('disconnected');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>CHAT UP</h2>
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message key={i} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>


        </div>
    )
}

export default Chat
