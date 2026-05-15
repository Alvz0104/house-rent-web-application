import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import axios from "axios";

import io from "socket.io-client";


const socket =
io("http://localhost:5000");


function Chat() {

    const { receiverId } =
    useParams();

    const [messages, setMessages] =
    useState([]);

    const [text, setText] =
    useState("");

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

    }, []);

    const fetchMessages =
    async () => {

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

    };

    const sendMessage =
    async () => {

        if (!text) return;

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

    };

    return (

        <div className="container mt-5">

            <h2>Chat</h2>

            <div
                className="
                border
                p-3
                mb-3
                "
                style={{
                    height: "400px",
                    overflowY: "scroll"
                }}
            >

                {messages.map(
                    (msg, index) => (

                    <div
                        key={index}
                        className={
                            msg.sender === user.id
                            ?
                            "text-end"
                            :
                            "text-start"
                        }
                    >

                        <p
                            className="
                            bg-light
                            d-inline-block
                            p-2
                            rounded
                            "
                        >
                            {msg.text}
                        </p>

                    </div>

                ))}

            </div>

            <div className="d-flex">

                <input
                    type="text"
                    className="
                    form-control
                    me-2
                    "
                    value={text}
                    onChange={(e) =>
                        setText(
                            e.target.value
                        )
                    }
                />

                <button
                    className="custom-btn"
                    onClick={sendMessage}
                >
                    Send
                </button>

            </div>

        </div>

    );
}

export default Chat;