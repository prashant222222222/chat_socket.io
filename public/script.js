//front end

// let socket = io();
// let boomBtn = document.getElementById("boom");
// //sending from client to the server
// boomBtn.onclick = function () {
//   socket.emit("boom");
//   //from server I want to know when the event has occurred
// };

// //sent by server
// socket.on("whizz", () => {
//   let div = document.createElement("div");
//   div.innerText = "main vikrant hoon , please koi mera gaand maaro";
//   document.body.append(div);
// });

// 2nd change

// let socket = io();
// let btnSend = document.getElementById("btnSend");
// let inpMsg = document.getElementById("inpMsg");
// let ulMsgList = document.getElementById("ulMsgList");

// btnSend.onclick = function () {
//   socket.emit("msg_send", {
//     msg: inpMsg.value,
//   }); //send a object
//   inpMsg.value = "";
// };

// socket.on("msg_rcvd", (data) => {
//   let liNewMsg = document.createElement("li");
//   liNewMsg.innerText = data.msg;
//   ulMsgList.appendChild(liNewMsg);
// });

// 3rd change
let socket = io();

$("#loginBox").show();
$("#chatBox").hide();

$("#btnStart").click(() => {
  socket.emit("login", {
    username: $("#inpUsername").val(),
    password: $("#inpPass").val(),
  });
});

socket.on("logged_in", () => {
  $("#loginBox").hide();
  $("#chatBox").show();
});

socket.on("login_failed", () => {
  window.alert("login failed");
});

$("#btnSendMsg").click(() => {
  socket.emit("msg_send", {
    to: $("#inpToUser").val(),
    msg: $("#inpNewMsg").val(),
  });
  $("#inpToUser").value = "";
});

socket.on("msg_rcvd", (data) => {
  $("#ulMsgs").append($("<li>").text(`[${data.from}] : ${data.msg}`));
});
