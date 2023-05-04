const express = require("express"),
  routes = require("./routes"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  helmet = require("helmet"),
  http = require("http"),
  https = require("https"),
  options = require("./cert"),
  port = process.env.NODE_PORT || 4000,
  app = express(),
  { socketConnection } = require("./services/socket"),
  urlencodedParser = bodyParser.urlencoded({
    extended: true,
  });

app.use(helmet());
app.use(cors());
app.use(urlencodedParser);
app.use((_, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, *"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-Security-Policy", "script-src 'self'");
  next();
});

app.use("/", routes.router);

app.use((_, res) => {
  res.status(404);
});

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(options, app);

socketConnection(httpServer);

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`We're mixing on port: ${port}`);
});
