const express = require("express"),
  path = require("path"),
  cors = require("cors"),
  apiVersion = "v1",
  { HTTP_OK } = require("./config/http.status.code"),
  route = require("./routes/index"),
  app = express();

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

app.use(express.static(path.resolve(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));
app.use(cors("*"));

app.get(`/${apiVersion}`, (req, res, next) => {
  res.json({
    name: "giftshores-service",
    version: "1.0.0",
    status: true,
  });
});

app.use(`/${apiVersion}`, route);

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
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(`Server started on port ${port} 🚀`);
});
