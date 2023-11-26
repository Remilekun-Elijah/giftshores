const mongoose = require("mongoose");
const { MongooseFindByReference } = require("mongoose-find-by-reference");
const dayjs = require("dayjs");

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
    via: String,
    dateAdded: {
      type: String,
      default: dayjs(Date.now()).format("DD/MM/YYYY"),
    },
  },
  { timestamps: true }
);

giftSchema.methods.findByGenderOrCountry = async (
  { filterA, filterB, limit, skip },
  next
) => {
  const docs = await this.UserModel.find(filterA);

  return await this.GiftModel.find({
    owner: { $in: docs?.map((d) => d?._id) },
    ...filterB,
  })
    .populate("owner", "-password")
    .limit(limit)
    .skip(skip)
    .sort({
      createdAt: -1,
    });
};

giftSchema.plugin(MongooseFindByReference);
exports.UserModel = mongoose.model("users", userSchema);
exports.GiftModel = mongoose.model("gifts", giftSchema);
