/* eslint-disable no-undef */
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../context/socket";
import { useNavigate } from "react-router-dom";
import { Sidenav, ToggleBtn } from "../";
import "./Chat.css";

const COLORS = [
  "#e21400",
  "#91580f",
  "#f8a700",
  "#f78b00",
  "#58dc00",
  "#287b00",
  "#a8f07a",
  "#4ae8c4",
  "#3b88eb",
  "#3824aa",
  "#a700ff",
  "#d300e7",
];
const daysOfWeek = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
const getDateTime = () => {
  const today = new Date();
  return `${daysOfWeek[today.getDay()]} ${
    today.getHours() + ":" + today.getMinutes()
  }`;
};

const Chat = () => {
  const socket = useContext(SocketContext),
    [chatTyping, setChatTyping] = useState(false),
    {
      sidenav: { isOpen },
      socket: { id, username },
    } = useSelector((state) => state),
    [typing, setTyping] = useState(""),
    [messages, setMessages] = useState([
      <p
        className="hr-lines leading-relaxed text-center mb-4 mx-2"
        dangerouslySetInnerHTML={{
          __html: "Lean back and just enjoy the melodies",
        }}
      />,
    ]),
    navigate = useNavigate(),
    getUsernameColor = (username) => {
      var hash = 7;
      for (var i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + (hash << 5) - hash;
      }
      var index = Math.abs(hash % COLORS.length);
      return COLORS[index];
    },
    handleTyping = (e) => {
      socket.emit("typing");
      setTyping(e.target.value);
    },
    handleSubmit = (e) => {
      e.preventDefault();
      socket.emit("new-message", {
        username: username,
        target: "",
        dateTime: getDateTime(),
        message: typing,
      });
      setTyping("");
    },
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
      const usernameDiv = (
        <span
          className="username"
          style={{ color: getUsernameColor(data.username) }}
          dangerouslySetInnerHTML={{ __html: data.username }}
        />
      );
      const dateTimeDiv = (
        <span
          className="dateTime"
          dangerouslySetInnerHTML={{ __html: data.dateTime }}
        />
      );
      const messageBodyDiv = (
        <span
          className="messageBody"
          dangerouslySetInnerHTML={{ __html: data.message }}
        />
      );

      const typingClass = data.typing ? "typing" : "";
      const privatMsg = privateOn ? "privatMsg" : "";
      const message = (
        <div className="message m-2">
          {usernameDiv}
          {dateTimeDiv}
          {messageBodyDiv}
        </div>
      );

      log(message);
      // privateOn
      //   ? addPrivMsgElement($messageDiv, options)
      //   : addMessageElement($messageDiv, options);
    },
    addChatTyping = (data) => {
      data.typing = true;
      data.message = "se concentre...";
      addChatMessage(data.privateOn, data);
    };

  socket.on("user-joined", (data) =>
    log(
      <p
        className="hr-lines leading-relaxed text-center mb-4 mx-2"
        dangerouslySetInnerHTML={{
          __html: `${data.username} vient de se pointer`,
        }}
      />
    )
  );
  socket.on("new-message", (data) => {
    addChatMessage(false, data);
    // if ($(".active").text() !== "@Crew") {
    //   $(`a:contains("@Crew")`).addClass("glow");
    //   $(".fa-arrow-right").addClass("glow");
    // }
  });

  socket.on("typing", (data) => {
    if (!chatTyping) {
      setChatTyping(true);
      addChatTyping(data);
    }
  });

  socket.on("disconnect", () => {
    log("t'es déconnecté");
  });

  socket.on("user left", (data) => {
    log(false, data.username + " s'est barré");
    // addParticipantsMessage(data);
    // addParticipantsOnList(data);
    // removeChatTyping(data);
  });

  useEffect(() => {
    !id && navigate("/");
  }, [id, navigate]);

  return (
    <>
      <Sidenav />
      <div
        className={`absolute inset-y-1/2 z-10 transition-all ease-in-out duration-500 ${
          isOpen ? "ml-72" : "-ml-4 "
        }`}
      >
        <ToggleBtn />
      </div>
      <div
        className={`chat-page flex flex-col h-screen transition-all ease-in-out duration-500 ${
          isOpen ? "ml-80" : "ml-0"
        }`}
      >
        <h2
          className={`title my-8 text-5xl text-[#091233] transition-all ease-in-out duration-500 ${
            isOpen ? "-translate-y-32" : "translate-y-0"
          }`}
        >
          Neko neko
        </h2>
        <div className="flex flex-col-reverse h-100 mx-auto overflow-x-hidden w-full">
          <ul className="container mx-auto text-left mb-16">
            {messages.map((msg, idx) => (
              <li key={idx} className="text-slate-700">
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
            autoFocus
            autoComplete="off"
            className={`absolute inset-x-0 mx-5 bottom-2.5 p-2.5 text-md text-gray-900 bg-slate-100 border border-gray-300 transition-all ease-in-out duration-500${
              isOpen ? " custom-margin-left" : ""
            }`}
            placeholder="Dis des trucs..."
          />
        </form>
      </div>
    </>
  );
};

export default Chat;
