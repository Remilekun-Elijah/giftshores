const api = require("express")();
const user = require("../controllers/users");
const admin = require("../controllers/admin");
const authorization = require("../middleware/auth.middleware");
api.post("/auth/login", user.login);
api.post("/user", user.createUser);
api.post("/gift/:userId", user.createGifts);
api.post("/send/:giftId", user.sendGift);

api.get("/admin/report", authorization, admin.getReport);
api.get("/admin/stats", authorization, admin.getStats);

module.exports = api;
