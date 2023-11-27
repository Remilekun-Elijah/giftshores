const api = require("express")();
const user = require("../controllers/users");
const admin = require("../controllers/admin");

api.post("/user", user.createUser);
api.post("/gift/:userId", user.createGifts);
api.post("/send/:giftId", user.sendGift);


api.get("/admin/report", admin.getReport);
api.get("/admin/stats", admin.getStats);



module.exports = api;
