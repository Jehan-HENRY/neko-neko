import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Sidenav from "../Sidenav";
import "./Chat.css";

const socket = io();
const daysOfWeek = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
const getDateTime = () => {
  var today = new Date();
  var day = daysOfWeek[today.getDay()];
  var time = today.getHours() + ":" + today.getMinutes();
  return `${day} ${time}`;
};

const Chat = () => {
  const {
      socket: { id },
    } = useSelector((state) => state),
    [typing, setTyping] = useState(""),
    [messages, setMessages] = useState([]),
    navigate = useNavigate(),
    handleTyping = (e) => setTyping(e.target.value),
    handleSubmit = (e) => {
      e.preventDefault();
      socket.emit("new-message", {
        username: "test",
        target: "",
        dateTime: getDateTime(),
        message: typing,
      });
      setTyping("");
    },
    // addMessageElement = (el, options) => {
    //   var $el = document.getElementById("test");
    //   // Setup default options
    //   if (!options) {
    //     options = {};
    //   }
    //   if (typeof options.fade === "undefined") {
    //     options.fade = true;
    //   }
    //   if (typeof options.prepend === "undefined") {
    //     options.prepend = false;
    //   }

    //   // Apply options
    //   if (options.fade) {
    //     // $el.hide().fadeIn(FADE_TIME);
    //   }
    //   if (options.prepend) {
    //     $messages.prepend($el);
    //   } else {
    //     $messages.append($el);
    //   }
    //   $messages[0].scrollTop = $messages[0].scrollHeight;
    // },
    log = (message, options, privateOn = false) => {
      setMessages([...messages, message]);
      // var $el = $("<li>")
      //   .addClass(privateOn ? "privateLog" : "log")
      //   .text(message);
      // privateOn
      //   ? addPrivMsgElement($el, options)
      //   : addMessageElement($el, options);
    },
    addChatMessage = (privateOn, data, options) => {
      // Don't fade the message in if there is an 'X was typing'
      // var $typingMessages = getTypingMessages(data);
      // options = options || {};
      // if ($typingMessages.length !== 0) {
      //   options.fade = false;
      //   $typingMessages.remove();
      // }

      // var $usernameDiv = $('<span class="username"/>')
      //   .text(data.username)
      //   .css("color", getUsernameColor(data.username));
      // var $dateTimeDiv = $('<span class="dateTime">')
      //   .addClass(privateOn ? "privatDateTime" : "")
      //   .text(data.dateTime);
      // var $messageBodyDiv = $('<span class="messageBody">')
      //   .addClass(privateOn ? "privatMessageBody" : "")
      //   .text(data.message);

      // var typingClass = data.typing ? "typing" : "";
      // var privatMsg = privateOn ? "privatMsg" : "";
      // var message = $('<li class="message"/>')
      //   .data("username", data.username)
      //   .addClass(typingClass)
      //   .addClass(privatMsg)
      //   .append($usernameDiv, $dateTimeDiv, $messageBodyDiv);

      log(data.message);
      // privateOn
      //   ? addPrivMsgElement($messageDiv, options)
      //   : addMessageElement($messageDiv, options);
    };

  useEffect(() => {
    console.log("TRIGGER");
    // connected = true;
    // $id = data.id;
    // // Display the welcome message
    // var $el = $("<li>")
    //   .addClass("flavour log title")
    //   .text("Neko neko");
    // addMessageElement($el, {
    //   prepend: true
    // });
    // var message = "Lean back and just enjoy the melodies";
    // log(false, message, {
    //   prepend: true
    // });
    // addParticipantsMessage(data);
    // addParticipantsOnList(data);
    // var $el = document
    //   .getElementById("test")
    //   // .addClass("flavour log title")
    //   .text("Neko neko");
    // addMessageElement($el, {
    //   prepend: true,
    // });
    // var message = "Lean back and just enjoy the melodies";
    // log(false, message, {
    //   prepend: true,
    // });
    log("Lean back and just enjoy the melodies");

    socket.on("disconnect", () => {
      log("t'es déconnecté");
    });

    // return () => {
    //   socket.off("login");
    // };
  }, []);

  useEffect(() => {
    socket.on("user-joined", (data) => {
      log(`${data.username} vient de se pointer`);
      // addParticipantsMessage(data);
      // addParticipantsOnList(data);
    });
    socket.on("new-message", (data) => {
      addChatMessage(false, data);
      // if ($(".active").text() !== "@Crew") {
      //   $(`a:contains("@Crew")`).addClass("glow");
      //   $(".fa-arrow-right").addClass("glow");
      // }
    });
  });

  useEffect(() => {
    !id && navigate("/");
  }, [id, navigate]);

  return (
    <div className="chat-page h-screen w-screen flex">
      <Sidenav />
      <div className="h-100 w-100 mx-auto my-10">
        <ul>
          <li className="title text-3xl text-slate-700">Neko neko</li>
          {messages.map((msg, idx) => (
            <li key={idx} className="text-slate-500">
              {msg}
            </li>
          ))}
        </ul>
        {/* Welcome in public chatroom ; id: {id} */}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleTyping}
          value={typing}
          id="message"
          className="absolute inset-x-0 bottom-0 p-2.5 text-md text-gray-900 bg-slate-100 border border-gray-300"
          placeholder="Dis des trucs..."
        />
      </form>
    </div>
  );
};

export default Chat;
