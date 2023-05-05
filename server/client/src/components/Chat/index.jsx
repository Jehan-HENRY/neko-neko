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
  ],
  getUsernameColor = (username) => {
    let hash = 7;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    return COLORS[Math.abs(hash % COLORS.length)];
  },
  daysOfWeek = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"],
  today = new Date(),
  getDateTime = () =>
    `${daysOfWeek[today.getDay()]} ${today.getHours()}:${
      today.getMinutes() < 10 ? "0" : ""
    }${today.getMinutes()}`;

const Chat = () => {
  const socket = useContext(SocketContext),
    [chatTyping, setChatTyping] = useState(false),
    {
      sidenav: { isOpen },
      socket: { id, username },
    } = useSelector((state) => state),
    [typing, setTyping] = useState(""),
    [messages, setMessages] = useState([]),
    navigate = useNavigate(),
    handleTyping = (e) => {
      socket.emit("typing");
      setTyping(e.target.value);
    },
    handleSubmit = (e) => {
      e.preventDefault();
      socket.emit("stop-typing");
      socket.emit("new-message", {
        username: username,
        target: "",
        dateTime: getDateTime(),
        message: typing,
      });
      setTyping("");
    },
    addChatMessage = (data) => {
      setMessages([
        ...messages,
        { ...data, color: getUsernameColor(data.username) },
      ]);
    };

  socket.on("user-joined", (data) =>
    setMessages([
      ...messages,
      {
        ...data,
        message: `${data.username} vient de se pointer`,
        joined: true,
      },
    ])
  );

  socket.on("new-message", (data) => {
    addChatMessage(data);
  });

  socket.on("typing", (data) => {
    if (!chatTyping) {
      setChatTyping(true);
      data.typing = true;
      data.message = "se concentre...";
      addChatMessage(data);
    }
  });

  socket.on("stop-typing", (data) => {
    if (chatTyping) {
      setChatTyping(false);
      const indexToRemove = messages.findIndex((item) => {
        if (item.username === data.username && !!item.typing) return item;
        return null;
      });
      setMessages([
        ...messages.slice(0, indexToRemove),
        ...messages.slice(indexToRemove + 1),
      ]);
    }
  });

  socket.on("disconnect", () =>
    setMessages([...messages, { message: "t'es déconnecté" }])
  );

  socket.on("user-left", (data) =>
    setMessages([...messages, { message: `${data.username} s'est barré` }])
  );

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
          <ul className="container mx-auto text-left mb-16 text-slate-700">
            <li>
              <p
                className="hr-lines leading-relaxed text-center mb-4 mx-2"
                dangerouslySetInnerHTML={{
                  __html: "Lean back and just enjoy the melodies",
                }}
              />
            </li>
            {messages.map((msg, idx) =>
              msg.joined ? (
                <li key={idx}>
                  <p className="hr-lines leading-relaxed text-center mb-4 mx-2">
                    {msg.message}
                  </p>
                </li>
              ) : (
                <li key={idx}>
                  <div
                    className={`message m-2${
                      msg.typing ? " typing animate-pulse" : ""
                    }`}
                    typing={`${msg.typing}`}
                  >
                    <span className="username" style={{ color: msg.color }}>
                      {msg.username}
                    </span>
                    <span className="dateTime">{msg.dateTime}</span>
                    <span className="messageBody">{msg.message}</span>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleTyping}
            value={typing}
            id="message"
            autoFocus
            autoComplete="off"
            className={`absolute inset-x-0 mx-3 lg:mx-48 bottom-2.5 p-2.5 rounded-lg text-md text-gray-900 bg-slate-100 border border-gray-300 transition-all ease-in-out duration-500${
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
