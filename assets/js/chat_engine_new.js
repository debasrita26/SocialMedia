let chatArea = $(".chat-room-display");
let selfUser;
let userMail;
let otherUser;
let currentChatRoom;
let roomList = [];

var socket = io.connect('http://localhost:5432',{
  'reconnection': true,
  'reconnectionDelay': 500,
  'reconnectionAttempts': 10,
  'transports':['websocket']
});
socket.on("connect", function () {
  console.log("connection established using sockets...!");
});

function joinRoom() {
  socket.emit("join_room", {
    user_email: userMail,
    chatroom: currentChatRoom,
  });

  socket.on("user_joined", function (data) {
    console.log("New User Joined", data);
  });
}

var sendMessage = () => {
  function activateMessageSending() {
    let inputBox = $(".chat-message-input");
    let msg = inputBox.val();

    if (msg != "") {
      socket.emit("send_message", {
        message: msg,
        user_id: selfUser._id,
        user_email: userMail,
        chatroom: currentChatRoom,
      });

      inputBox.val("");
    }
  }

  $("#send-message").click(activateMessageSending); // click action

  $("input").keydown(function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      activateMessageSending();
    }
  });
};

function connectRoom() {
  
  if (!roomList.includes(currentChatRoom)) {
    joinRoom();
    roomList.push(currentChatRoom);
  }

  sendMessage();
}

socket.on("receive_message", function (data) {
  let messageList = $(`#chat-messages-list-${currentChatRoom}`);
  let messageType = "other";

  if (data.user_email === userMail) {
    messageType = "self";
  }

  if (messageType === "self") {
    messageList.append(
      ` <div class="self-message">
          <div class="self-user">
            <div class="message-content-self">${data.message}</div>
          </div>
        </div>
      `
    );
  } else {
    messageList.append(`
     <div class="other-message">
          <div class="other-user">
            <div class="other-user-image">
              ${
                otherUser.avatar
                  ? `<img
            src="${otherUser.avatar}"
            alt="image"
          />`
                  : `<img src="images/user_icon.png" alt="image"/>`
              }
            </div>
            <div class="message-content-other">${data.message}</div>
          </div>
        </div>
    `);
  }
  scrollBottom();
});

function createArea(chatRoom, friend, user) {
  return `
  <div class="user-chat-box">
      <div class="chat-header">
      <div class="back-button"><i class="far fa-arrow-alt-circle-left"></i></div>
        <div class="header-avatar">
        ${
          friend.avatar
            ? `<img
            src="${friend.avatar}"
            alt="image"
          />`
            : `<img
            src="/images/user_icon.png"
            alt="image"
          />`
        }
        </div>
        <div class="header-name">${friend.name}</div>
      </div>
      <div class="chat-messages-list-style" id="chat-messages-list-${
        chatRoom._id
      }">

      ${chatRoom.messages
        .map((chat) => {
          return `${
            chat.user === user._id
              ? `<div class="self-message">
          <div class="self-user">
            <div class="message-content-self">${chat.message}</div>
          </div>
        </div>`
              : `<div class="other-message">
          <div class="other-user">
            <div class="other-user-image">
              ${
                friend.avatar
                  ? `<img
            src="${friend.avatar}"
            alt="image"
          />`
                  : `<img
            src="/images/user_icon.png"
            alt="image"
          />`
              }
            </div>
            <div class="message-content-other">${chat.message}</div>
          </div>
        </div>`
          }`;
        })
        .join("")}
      </div>
      <div class="chat-message-input-container">
        <input class="chat-message-input" placeholder="Type message here" required/>
        <button id="send-message">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>`;
}

$(".chat-list").each(function () {
  $(this).click(function () {
    const friendId = $(this).attr("data-friendId");
    $.ajax({
      type: "GET",
      url: `/messages/chatroom?friend=${friendId}`,

      success: function (data) {
        let { chatRoom, friend, user } = data.data;
        let room = createArea(chatRoom, friend, user);
        chatArea.empty();
        chatArea.append(room);
        scrollBottom();
   
        selfUser = user;
        otherUser = friend;
        currentChatRoom = chatRoom._id;
        userMail = user.email;

        connectRoom();
        changeScreen();
        arrow();
        tempClass(friendId);
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
});

function arrow() {
  $(".back-button").click(() => {
    $(".chat-room-display").css("display", "none");
    $("#chat-room-name").css({ display: "block", width: "100%" });
  });
}

function changeScreen() {
  if (window.innerWidth <= 430) {
    $(".chat-room-display").css({ display: "block", width: "100%" });
    $("#chat-room-name").css("display", "none");
  }
}

function scrollBottom() {
  let list = document.getElementsByClassName("chat-messages-list-style")[0];
  list.scrollTop = list.scrollHeight;
}

function tempClass(friendId) {
  $("#roomlist > div").removeClass("temporary-highlight");
  $(`#friend-${friendId}`).addClass("temporary-highlight");
}


// class ChatEngine
// {
//     constructor(chatBoxId, userEmail){
//         this.chatBox=$(`#${chatBoxId}`);
//         this.userEmail=userEmail;
        
//         this.socket = io.connect('http://localhost:5432',{ transports: ['websocket']});
        
//         if(this.userEmail){ 
//             this.connectionHandler();
//         }
//     }

    
//     connectionHandler(){
//         let self=this;
//         this.socket.on('connect', function(){
//             console.log('connection established using sockets');
       
//         self.socket.emit('join_room', {
//             user_email: self.userEmail,
//             chatroom: 'codeial'
//         });
        
//         self.socket.on('user_joined', function(data){
//             console.log('A user has joined',data);
//         })
//     });

//         $('#send-message').click(function(){
//             let msg=$('#chat-message-input').val();

//             if(msg!= ''){
//                 self.socket.emit('send_message',{
//                     message: msg,
//                     user_email: self.userEmail,
//                     chatroom: 'codeial'
//                 });
//             }
//         });

//         self.socket.on('receive_message',function(data){
//             console.log('message received',data.message);

//         let newMessage=$('<li>');

//         let messageType='other-message';

//         if(data.user_email==self.userEmail){
//             messageType='self-message';
//         }

//         newMessage.append($('<span>',{
//             'html': data.message
//         }));

//         newMessage.append($('<span>',{
//             'html': data.user_email
//         }));

//         newMessage.addClass(messageType);

//         $('#chat-messages-list').append(newMessage);
//       })
//     }
// }