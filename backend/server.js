const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const path = require("path");

const http = require("http");

const { Server } =
require("socket.io");

require("dotenv").config();


// ROUTES
const authRoutes =
require("./routes/authRoutes");

const propertyRoutes =
require("./routes/propertyRoutes");

const bookingRoutes =
require("./routes/bookingRoutes");

const chatRoutes =
require("./routes/chatRoutes");


const app = express();

const server =
http.createServer(app);


// SOCKET.IO
const io = new Server(server, {

    cors: {

        origin:
        "http://localhost:3000",

        methods: [
            "GET",
            "POST"
        ]

    }

});


// ONLINE USERS
let users = {};


// SOCKET CONNECTION
io.on("connection", (socket) => {

    console.log(
        "User connected:",
        socket.id
    );

    // JOIN
    socket.on(
        "join",
        (userId) => {

            users[userId] =
            socket.id;

        }
    );

    // SEND MESSAGE
    socket.on(
        "sendMessage",
        (messageData) => {

            const receiverSocketId =
            users[
                messageData.receiver
            ];

            if (receiverSocketId) {

                io.to(
                    receiverSocketId
                ).emit(
                    "receiveMessage",
                    messageData
                );

            }

        }
    );

    // DISCONNECT
    socket.on(
        "disconnect",
        () => {

            console.log(
                "User disconnected"
            );

        }
    );

});


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// STATIC FILES
app.use(

    "/uploads",

    express.static(

        path.join(
            __dirname,
            "uploads"
        )

    )

);


// ROUTES
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/properties",
    propertyRoutes
);

app.use(
    "/api/bookings",
    bookingRoutes
);

app.use(
    "/api/chat",
    chatRoutes
);


// DATABASE
mongoose.connect(
    process.env.MONGO_URL
)

.then(() => {

    console.log(
        "MongoDB Connected"
    );

})

.catch((err) => {

    console.log(err);

});


// TEST ROUTE
app.get("/", (req, res) => {

    res.send(
        "Housetify API Running"
    );

});


// SERVER
const PORT =
process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(

        `Server running on port ${PORT}`

    );

});