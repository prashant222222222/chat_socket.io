const http = require("http");

const express = require("express");
const app = express();
const socketio = require("socket.io");
const { emit } = require("process");
//here we have to create a server
const server = http.createServer(app);
//call socket.io library with http server
const io = socketio(server);
//http://localhost:3344/socket.io/socket.io.js go here to check socket.io setup is done
//this file gets available at front end because server.io is both client side and serverside library
//

//function with incoming object socket
// io.on("connection", (socket) => {
//   console.log("connected with server socket id= ", socket.id);
//   //when boom event happens
//   socket.on("boom", () => {
//     console.log("mera gaand maaro received from vikrant - ", socket.id);
//   });
//   setInterval(() => {
//     socket.emit("whizz");
//   }, 2000);
// });
//if there is socket connection then you will see the message in network section in browser

//second change
// io.on("connection", (socket) => {
//   console.log("connected with server socket id= ", socket.id);
//   socket.on("msg_send", (data) => {
//     // io.emit("msg_rcvd", data); //on line 22 we did socket.emit
//     //if I do socket.emit then only the guy who is sending the message will get back response on because he is only on that particular socket
//     //with IO.emit all the sockets on server will receive the message by server
//     //console.log("received", data.msg);
//     socket.broadcast.emit("msg_rcvd", data); //all the other sockets except the one who has sent message will get the response from the server with the message sent by the particular socket
//   });
// });

//3rd change

let users = {
  prashant: "prashant",
};

let socketMap = {};
io.on("connection", (socket) => {
  console.log("connected with server socket id= ", socket.id);
  //empty password
  function login(s, u) {
    s.join(u);
    s.emit("logged_in");
    socketMap[s.id] = u;
    console.log(socketMap);
  }

  socket.on("login", (data) => {
    if (users[data.username]) {
      if (users[data.username] == data.password) {
        login(socket, data.username);
      } else {
        socket.emit("login_failed");
      }
    } else {
      users[data.username] = data.password;
      login(socket, data.username);
      // socket.join(data.username);
      // socket.emit("logged_in");
    }
    console.log(users);
    // socket.join(data.username);
    // socket.emit("logged_in");
  });

  socket.on("msg_send", (data) => {
    data.from = socketMap[socket.id];
    if (data.to) {
      io.to(data.to).emit("msg_rcvd", data);
    } else {
      socket.broadcast.emit("msg_rcvd", data);
    }
  });
});

app.use("/", express.static(__dirname + "/public"));

server.listen(3345, () => {
  console.log("Started ");
});
