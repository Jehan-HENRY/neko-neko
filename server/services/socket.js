let io;
const users = [];

const socketConnection = (server) => {
  io = require("socket.io")(server);
  io.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    socket.join(socket.request._query.id);
    socket.on("disconnect", () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });

    socket.on("send-nickname", function (nickname) {
      socket.nickname = nickname;
      users.push(socket.nickname);
      console.info("users", users);
      socket.emit("login", {
        id: socket.id,
        total: users.length,
        users: users,
      });
      socket.broadcast.emit("user-joined", {
        username: socket.nickname,
        total: users.length,
        users: users,
      });
    });

    socket.on("new-message", (data) => {
      socket.broadcast.emit("new-message", {
        username: socket.username,
        dateTime: data.dateTime,
        message: data.message,
      });
    });

    socket.on("typing", (target) => {
      target
        ? io
            .to(target)
            .emit("typing", { private: true, username: socket.username })
        : socket.broadcast.emit("typing", {
            private: false,
            username: socket.username,
          });
    });

    socket.on("stop-typing", (target) => {
      target
        ? io.to(target).emit("stop typing", { username: socket.username })
        : socket.broadcast.emit("stop typing", {
            username: socket.username,
          });
    });

    socket.on("disconnect", () => {
      users.splice(users.indexOf({ nickname: socket.nickname }), 1);
      socket.broadcast.emit("user-left", {
        username: socket.nickname,
        total: users.length,
        users: users,
      });
    });
  });
};

module.exports = { socketConnection };
