const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
        cors: {
          origin: "*",
        },
});
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const router = require("./router");
const {users, addUser, removeUser, getUser} = require("./users");
const { allowedNodeEnvironmentFlags } = require('process');



app.use(router);
app.use(cors());

io.on("connection", (socket) => {
    console.log("We have a new connection !!!");

    socket.on("join", ({nickname, channel}, callback) => {
        console.log(nickname, channel);

        const {error, user} = addUser({id : socket.id, nickname, channel});

        // const error = true;

        if(error) {
            callback(error);
        }

        socket.join(user.channel);
        console.log(users);
        socket.emit("message", {user: "admin", text: `${user.nickname}, welcome to THE channel ${user.channel}`});
        socket.broadcast.to(user.channel).emit("message", {user: "admin", text: `${user.nickname} has joined ${user.channel} channel.`});



       io.to(user.channel).emit('channelData', {channel: user.channel, users: users})

        callback(); // pour envoyer le callback au front quand il n'y a pas d'erreur
    })

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        console.log(socket.id);

        io.to(user.channel).emit("message", {user: user.nickname, text: message});
       // io.to(user.channel).emit("channelData", {channel: user.channel, users: getUsersInChannel(user.channel)});

        callback();

        if(message==="/users"){
            let usersName = ""
            for(i = 0; i < users.length; i++){
                usersName = usersName + "\n" +users[i].nickname;
                }
            socket.emit("message", {user: "admin", text: `Here is the list of every users in this chanel : `+usersName});

        }


     

        if(message.includes("/nick")){
            let nouveau = "premier";
            nouveau = message.substr(6)
            user.nickname = nouveau;
            tkttestmgl = user.channel;
            // href='localhost:3000/chat?nickname='+nouveau+'&channel='+tkttestmgl+'';
        }

    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.channel).emit('message', {user: 'admin', text: `${user.nickname} has left.`})
        }
        console.log("User has left!!!!");
    })


})





server.listen(PORT, () => console.log("Server is listening on port " + PORT));
