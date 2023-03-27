const users = [];

const socketConnection = (server) => {
  io = require("socket.io")(server);
  io.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    socket.join(socket.request._query.id);

    socket.on("send-username", function (username) {
      socket.username = username;
      users.push({ id: socket.id, username: socket.username });
      io.to(socket.id).emit("login", {
        id: socket.id,
        username,
        total: users.length,
        users,
      });
      socket.broadcast.emit("user-joined", {
        username,
        total: users.length,
        users,
      });
    });

    socket.on("new-message", (data) => {
      io.emit("new-message", {
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
        ? io
            .to(target)
            .emit("stop-typing", { private: true, username: socket.username })
        : socket.broadcast.emit("stop-typing", {
            private: false,
            username: socket.username,
          });
    });

    socket.on("disconnect", () => {
      console.info(`Client disconnected [id=${socket.id}]`);
      users.splice(
        users.findIndex(({ username }) => username === socket.username),
        1
      );
      socket.broadcast.emit("user-left", {
        username: socket.username,
        total: users.length,
        users: users,
      });
    });
  });
};

module.exports = { socketConnection };
