import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./Chat.css";

const socket = io();

const Chat = () => {
  const {
      socket: {
        me: { id },
      },
    } = useSelector((state) => state),
    navigate = useNavigate(),
    log = (privateOn, message, options) => {
      console.log("message", message);
      // var $el = $("<li>")
      //   .addClass(privateOn ? "privateLog" : "log")
      //   .text(message);
      // privateOn
      //   ? addPrivMsgElement($el, options)
      //   : addMessageElement($el, options);
    };

  useEffect(() => {
    console.log("TRIGGER");
    socket.on("login", (data) => {
      console.log(`Chat login data`, data);
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
    });

    socket.on("disconnect", () => {
      log(false, "t'es déconecté");
    });

    // return () => {
    //   socket.off("login");
    // };
  }, []);

  useEffect(() => {
    !id && navigate("/");
  }, [id, navigate]);

  return (
    <div className="chat-page h-screen w-screen flex">
      <div className="flex items-center mx-auto">Welcome in public chatroom ; id: {id}</div>
    </div>
  );
};

export default Chat;
