import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initSocket } from "../../store/reducers/socket";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import title from "../../assets/title.png";

const socket = io();

const Identify = () => {
  const {
      socket: { id },
    } = useSelector((state) => state),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    [nickname, setNickname] = useState(""),
    handleChange = (e) => {
      setNickname(e.target.value);
    },
    handleSubmit = (e) => {
      e.preventDefault();
      if (!nickname) return;
      socket.emit("send-nickname", nickname);
    };

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("disconnect", () => {});

    socket.on("login", (data) => {
      dispatch(initSocket(data));
    });
  }, [dispatch]);

  useEffect(() => {
    id && navigate("chat");
  }, [id, navigate]);

  return (
    <>
      <img src={title} alt="title" className="mx-auto mb-10 w-60" />
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="title block mb-3 text-lg font-medium text-slate-200"
          >
            C'est quoi ton p'tit nom ?
          </label>
          <input
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Un truc qui déchire"
            required
            onChange={handleChange}
          />
        </div>
      </form>
    </>
  );
};

export default Identify;
