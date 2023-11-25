const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    password: String,
    gender: String,
  },
  { timestamps: true }
);

const giftSchema = new mongoose.Schema(
  {
    gifts: Array,
    purpose: String,
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    recipients: {
      type: Array,
      default: [],
    },
    via: {
      type: String,
      default: "mail"
    }
  },
  { timestamps: true }
);

exports.UserModel = mongoose.model("users", userSchema);
exports.GiftModel = mongoose.model("gifts", giftSchema);
