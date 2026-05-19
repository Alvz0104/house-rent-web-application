import {
    useEffect,
    useState,
    useRef
} from "react";

import {
    useParams
} from "react-router-dom";

import axios from "axios";

import io from "socket.io-client";

import {
    Container,
    Form,
    Button
} from "react-bootstrap";

const socket =
io("http://localhost:5000");


function Chat() {

    const { receiverId } =
    useParams();

    const [messages, setMessages] =
    useState([]);

    const [text, setText] =
    useState("");

    const [receiver, setReceiver] = useState(null);

    const messagesEndRef = useRef(null);

    const token =
    localStorage.getItem("token");

    const user =
    JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        socket.emit(
            "join",
            user.id
        );

        fetchMessages();
        fetchReceiverInfo();

        socket.on(
            "receiveMessage",
            (message) => {

                setMessages(
                    (prev) => [

                        ...prev,

                        message

                    ]
                );

            }
        );

        return () => {
            socket.off("receiveMessage");
        };

    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchReceiverInfo = async () => {
        try {
            // You may need to add an endpoint to get user info
            setReceiver({ id: receiverId });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMessages =
    async () => {

        try {

            const res =
            await axios.get(

                `http://localhost:5000/api/chat/${receiverId}`,

                {
                    headers: {
                        Authorization:
                        token
                    }
                }

            );

            setMessages(res.data);

        } catch (error) {
            console.log(error);
        }

    };

    const sendMessage =
    async () => {

        if (!text.trim()) return;

        try {

            const messageData = {

                receiver:
                receiverId,

                text

            };

            await axios.post(

                "http://localhost:5000/api/chat/send",

                messageData,

                {
                    headers: {
                        Authorization:
                        token
                    }
                }

            );

            const newMessage = {

                sender:
                user.id,

                receiver:
                receiverId,

                text

            };

            socket.emit(
                "sendMessage",
                newMessage
            );

            setMessages([
                ...messages,
                newMessage
            ]);

            setText("");

        } catch (error) {
            console.log(error);
        }

    };

    return (

        <div style={{background: '#F7F7F7', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px'}}>

            <Container style={{maxWidth: '700px'}}>

                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '600px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
                }}>

                    {/* Header */}
                    <div style={{
                        padding: '20px',
                        borderBottom: '1px solid #DDDDDD',
                        borderRadius: '12px 12px 0 0'
                    }}>
                        <h3 style={{fontSize: '1.1rem', fontWeight: '600', margin: 0}}>
                            💬 Chat
                        </h3>
                    </div>

                    {/* Messages */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}
                    >

                        {messages.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                color: '#717171',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}>
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map(
                                (msg, index) => (

                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        justifyContent: msg.sender === user.id ? 'flex-end' : 'flex-start'
                                    }}
                                >

                                    <p
                                        style={{
                                            background: msg.sender === user.id ? '#FF385C' : '#F7F7F7',
                                            color: msg.sender === user.id ? 'white' : '#222222',
                                            padding: '12px 16px',
                                            borderRadius: '16px',
                                            maxWidth: '70%',
                                            wordWrap: 'break-word',
                                            margin: 0
                                        }}
                                    >
                                        {msg.text}
                                    </p>

                                </div>

                            )
                        ))}
                        <div ref={messagesEndRef} />

                    </div>

                    {/* Input */}
                    <div style={{
                        padding: '20px',
                        borderTop: '1px solid #DDDDDD',
                        borderRadius: '0 0 12px 12px',
                        display: 'flex',
                        gap: '8px'
                    }}>

                        <Form.Control
                            type="text"
                            placeholder="Type a message..."
                            value={text}
                            onChange={(e) =>
                                setText(
                                    e.target.value
                                )
                            }
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                            style={{
                                borderRadius: '20px',
                                padding: '10px 16px',
                                fontSize: '0.9rem'
                            }}
                        />

                        <Button
                            className="custom-btn"
                            onClick={sendMessage}
                            style={{
                                borderRadius: '20px',
                                padding: '10px 20px'
                            }}
                        >
                            Send
                        </Button>

                    </div>

                </div>

            </Container>

        </div>

    );
}

export default Chat;