const http = require("http");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/app/index.html");
});

const server = http.createServer(app);

const io = require("socket.io")(server);

io.on("connection", (socket) => console.log("A new client connected!"));

server.listen(PORT, HOST, () =>
  console.log(`Running on http://${HOST}:${PORT}`)
);
