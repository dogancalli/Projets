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
const {users, addUser, removeUser, getUser, getUsersInChannel, setNickname, setOldNicknames, getUserByNickname} = require("./users");
const { allowedNodeEnvironmentFlags } = require('process')
const _ = require('lodash');
let bodyParser = require('body-parser')

app.use(bodyParser.json());


const Channel = require('../Api/controllers/channel.controller');
require('../Api/routes/message.routes')(app);
require('../Api/routes/user.routes')(app);
require('../Api/routes/link.routes')(app);




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



        io.to(user.channel).emit('channelData', {channel: user.channel, users: getUsersInChannel(user.channel)})




        callback(); // pour envoyer le callback au front quand il n'y a pas d'erreur
    })



    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);

        //---------------------privateMessage---------------------
       if(message.includes ("/msg")){
            const splitMessage = _.toArray(_(message).split(" ").value())
           const recipient = getUserByNickname(splitMessage[1]);
            const content = _(splitMessage).slice(2, splitMessage.length).join(" ");
           io.to(recipient.id).emit( "message", {user: user.nickname, text: content});
           io.to(user.id).emit( "message", {user: user.nickname, text: message});
               console.log("split : " + content)
            /*socket.emit("privateMessage", {nickname: user.nickname, text: message})*/

        }
       //------------------------------------------------
        else if(message==="/users"){
            let usersName = ""
            for(i = 0; i < users.length; i++){
                usersName = usersName + "\n" +users[i].nickname;
            }
           io.to(user.id).emit("message", {user: user.nickname, text: message});
           socket.emit("message", {user: "admin", text: `Here is the list of every users in this chanel : `+ usersName});
        }

        else if(message.includes("/nick")) {
            setOldNicknames(user.id, user.nickname);
            let newNick = "premier";
            newNick = message.substr(6)
            setNickname(user.id, newNick)
           io.to(user.id).emit("message", {user: user.nickname, text: message});
           socket.emit("newNickname", {nickname: user.nickname, oldNicknames: user.oldNicknames})

        }

        else if(message.includes("/create")) {
            newChannel = message.substr(8);
            Channel.createChannel(newChannel);
            // ici à faire function io.emit("/create" , newchannel);
        }

        else if(message.includes("/delete")) {
            channelName = message.substr(8);
            Channel.deleteChannel(channelName);
        }

        else if(message.includes("/list")) {
                if(message.length<=6)
            {
                Channel.findAllChannels();
            }
                else
            {
                channelName = message.substr(6);
                Channel.findOneChannel(channelName);
            }
        }

        else if(message.includes("/join")) {
            joinChannel = message.substr(6);
            Channel.findChannelByName(joinChannel);
            //ici à faire function io.emit("/join" , le channel qui a été get);
        }

        else{
           /*  console.log(socket.id);*/
           io.to(user.channel).emit("message", {user: user.nickname, text: message});
           // io.to(user.channel).emit("channelData", {channel: user.channel, users: getUsersInChannel(user.channel)});
       }

        callback();

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
