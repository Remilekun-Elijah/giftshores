const api = require("express")();
const user = require("../controllers/users");
api.post("/user", user.createUser);
api.post("/gift/:userId", user.createGifts);
api.post("/send/:giftId", user.sendGift);

module.exports = api;
