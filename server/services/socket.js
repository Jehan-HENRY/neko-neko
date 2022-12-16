let io;
const socketConnection = (server) => {
  io = require('socket.io')(server);
  io.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    socket.join(socket.request._query.id);
    socket.on('disconnect', () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });
  });
};

module.exports = { socketConnection };

// const io = require("socket.io");
// const listUsers = [];
// const rooms = [];

// io.on("connection", (socket) => {
//   let addedUser = false;

//   socket.on("new message", (data) => {
//     socket.broadcast.emit("new message", {
//       username: socket.username,
//       dateTime: data.dateTime,
//       message: data.message,
//     });
//   });

//   socket.on("add user", (username) => {
//     if (addedUser) return;

//     socket.username = username;
//     listUsers.push({
//       id: socket.id,
//       username: username,
//     });
//     addedUser = true;
//     socket.emit("login", {
//       id: socket.id,
//       numUsers: listUsers.length,
//       listUsers: listUsers,
//     });
//     socket.broadcast.emit("user joined", {
//       username: socket.username,
//       numUsers: listUsers.length,
//       listUsers: listUsers,
//     });
//   });

//   socket.on("typing", (target) =>
//     target
//       ? _to(target).emit("typing", {
//           privateOn: true,
//           username: socket.username,
//         })
//       : socket.broadcast.emit("typing", {
//           privateOn: false,
//           username: socket.username,
//         })
//   );

//   socket.on("stop typing", (target) =>
//     target
//       ? _to(target).emit("stop typing", { username: socket.username })
//       : socket.broadcast.emit("stop typing", {
//           username: socket.username,
//         })
//   );

//   socket.on("disconnect", () => {
//     if (addedUser) {
//       listUsers.splice(listUsers.indexOf({ username: socket.username }), 1);
//       for (i = 0; i < rooms.length; i++) {
//         if (rooms.length !== 0 && rooms[i].users.includes(socket.id)) {
//           rooms.splice(i, 1);
//         }
//       }

//       socket.broadcast.emit("user left", {
//         username: socket.username,
//         numUsers: listUsers.length,
//         listUsers: listUsers,
//       });
//     }
//   });

//   socket.on("initPrivate", (target) => {
//     if (target === socket.id) {
//       socket.emit("initPrivate", {
//         id: socket.id,
//         msg: "It's you asshole !",
//       });
//     } else {
//       let from =
//         listUsers[
//           listUsers
//             .map((e) => {
//               return e.id;
//             })
//             .indexOf(socket.id)
//         ].username;
//       let to =
//         listUsers[
//           listUsers
//             .map((e) => {
//               return e.id;
//             })
//             .indexOf(target)
//         ].username;
//       let alreadyExist = false;
//       let roomNum = rooms.length + 1;
//       for (i = 0; i < rooms.length; i++) {
//         if (
//           rooms.length !== 0 &&
//           rooms[i].users.includes(socket.id) &&
//           rooms[i].users.includes(target)
//         ) {
//           alreadyExist = true;
//           roomNum = rooms[i].room;
//         }
//       }
//       !alreadyExist &&
//         rooms.push({
//           room: roomNum,
//           users: [socket.id, target],
//         });
//       _to(target).emit("initPrivate", {
//         id: socket.id,
//         username: from,
//         room: roomNum,
//         msg: "I just met you",
//         alreadyExist: alreadyExist,
//         target: true,
//       });
//       socket.emit("initPrivate", {
//         id: target,
//         username: to,
//         room: roomNum,
//         msg: "can you hear me?",
//         alreadyExist: alreadyExist,
//         target: false,
//       });
//     }
//   });

//   socket.on("private", (data) => {
//     _to(data.target).emit("private", {
//       from: socket.id,
//       target: data.target,
//       username: socket.username,
//       dateTime: data.dateTime,
//       message: data.message,
//     });
//   });
// });
