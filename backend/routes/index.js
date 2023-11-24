const api = require("express")();
const user = require("../controllers/users");
api.get("/user", user.createUser);

module.exports = api;
