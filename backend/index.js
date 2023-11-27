const express = require("express"),
  json2xls = require("json2xls"),
  cors = require("cors"),
  apiVersion = "/v1",
  route = require("./routes/index"),
  app = express(),
  mongoose = require("mongoose"),
  consola = require("consola"),
  config = require("./config/index");

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(cors("*"));

app.get(apiVersion, (req, res, next) => {
  res.json({
    name: "Giftshores Service",
    version: "1.0.0",
    success: true,
  });
});

app.use(json2xls.middleware);
app.use(apiVersion, route);

app.use("*", (req, res, next) => {
  res.status(404).json({
    success: true,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: true,
    message: "Internal server error",
    error: err.message,
    stack: err.stack,
  });
});
let retry = 0;

const connect = async (conString) => {
  consola.info("Initiating MongoDB connection...");

  return mongoose
    .connect(conString)
    .then((doc) => {
      consola.success(`Mongodb connected successfully from 🚀`);
    })
    .catch((err) => {
      if (err) {
        if (retry < 3) {
          retry++;
          if (retry > 1) consola.info("Retrying again in 5 seconds...");
          else consola.info("Retrying in 5 seconds...");
          setTimeout(() => connect(conString || config.mongodb_uri), 2000);
        } else {
          consola.error("Failed to connect to MongoDB Atlas.");
          consola.info("Attempting to connect locally...");
          // setTimeout(() => connect(config.mongodb_uri), 3000);
        }
      }
    });
};
connect(config.dbUrl);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  consola.info(`Server started on port ${port} 🚀`);
});
