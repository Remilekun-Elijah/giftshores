const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_BAD_REQUEST,
  HTTP_OK,
  HTTP_NOT_FOUND,
} = require("../config/http.status.code");
const { sendMail } = require("../config/mail");
const { UserModel, GiftModel } = require("../models/user");
const joi = require("joi");
const validateUser = joi.object({
    firstName: joi.string().min(3).max(100).required(),
    lastName: joi.string().min(3).max(100),
    email: joi.string().email({ minDomainSegments: 2 }),
    country: joi.string(),
    gender: joi.string(),
    role: joi.string(),
  }),
  dayjs = require("dayjs"),
  helper = require("../config/helper");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (user) {
      const iscorrect = helper.comparePassword(user.password, password);
      if (iscorrect) {
        const token = helper.generateUserToken(user._id, user.role);

        // update last login
        await UserModel.findByIdAndUpdate(user._id, {
          lastLogin: dayjs(new Date()).format("YYYY-MM-DD HH:mm"),
        });

        res.status(HTTP_OK).json({
          success: true,
          message: "Logged in successfully",
          data: {
            token,
            user,
          },
        });
      } else {
        res.status(HTTP_BAD_REQUEST).json({
          success: false,
          message: "Username or password is incorrect",
        });
      }
    } else {
      res.status(HTTP_NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    req.body.role = req.body.role || "user";
    const payload = await validateUser.validateAsync(req.body);
    const doc = await UserModel.create({ ...payload });
    if (doc) {
      res.json({
        success: true,
        message: "Saved",
        data: doc,
      });
    } else {
      res.json({
        success: true,
        message: "Could not process your data, please try again.",
      });
    }
  } catch (err) {
    if (err.details) {
      res.json({
        success: false,
        code: HTTP_UNPROCESSABLE_ENTITY,
        error: err.details[0].message,
      });
    } else next(err);
    //  respond with error to the client
  }
};

async function getGiftById(id) {
  const gift = await GiftModel.findById(id).populate("owner", "-password");
  return gift;
}

exports.createGifts = async (req, res, next) => {
  try {
    const payload = req.body,
      { userId } = req.params;

    if (payload.gifts && payload.gifts.length) {
      const doc = await GiftModel.create({ ...payload, owner: userId });
      if (doc) {
        res.json({
          success: true,
          message: "Saved",
          data: doc,
        });
      } else {
        res.json({
          success: true,
          message: "Could not process your data, please try again.",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Gift name(s) is required",
      });
    }
  } catch (err) {
    let message = err.message;
    //  respond with error to the client
    res.json({
      success: false,
      code: HTTP_UNPROCESSABLE_ENTITY,
      error: message,
    });
  }
};

exports.sendGift = async (req, res, next) => {
  const { giftId } = req.params,
    { recipients } = req.body,
    { type } = req.query;
  try {
    const gift = await getGiftById(giftId);

    if (type === "whatsapp") {
      await GiftModel.findByIdAndUpdate(giftId, {
        isSent: true,
        via: "whatsapp",
      });
    }
    if (recipients?.length) {
      await GiftModel.findByIdAndUpdate(giftId, {
        recipients,
      });

      await sendMail({
        to: recipients,
        subject: "Start Your Wishlist Journey with Giftshores!",
        handleSuccess: async () => {
          await GiftModel.findByIdAndUpdate(giftId, {
            isSent: true,
            via: "mail",
          });
        },
        handleError: () => {},
        data: {
          name: `${gift.owner.firstName} ${gift.owner.lastName}`,
          gifts: gift.gifts,
          host: "https://www.giftshores.com/",
        },
      })
        .then((err) => {
          console.log(err, "SUCCESS");
        })
        .catch((err) => console.log(err, "ERROR"));
    }

    res.json({
      success: true,
      message: "Wish-list successfully sent",
      data: gift,
    });
  } catch (err) {
    next(err);
  }
};
