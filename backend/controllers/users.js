const { HTTP_UNPROCESSABLE_ENTITY } = require("../config/http.status.code");
const { sendMail } = require("../config/mail");
const { UserModel, GiftModel } = require("../models/user");
const joi = require("joi");
const validateUser = joi.object({
  firstName: joi.string().min(3).max(100).required(),
  lastName: joi.string().min(3).max(100),
  email: joi.string().email({ minDomainSegments: 2 }),
  country: joi.string(),
  gender: joi.string(),
  // purpose: joi.string(),
});

exports.createUser = async (req, res, next) => {
  try {
    const payload = await validateUser.validateAsync(req.body);
    const doc = await UserModel.create(payload);
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
    let message = err?.message;
    console.log(err);
    if (err.details) {
      message = err.details?.[0]?.message;
    }
    //  respond with error to the client
    res.json({
      success: false,
      code: HTTP_UNPROCESSABLE_ENTITY,
      error: message,
    });
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

    if (payload.gifts && payload?.gifts?.length) {
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
    let message = err?.message;
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
    { recipients } = req.body;

  const gift = await getGiftById(giftId);

  if (recipients.length) {
    await sendMail({
      to: recipients,
      subject: "Start Your Wishlist Journey with Giftshores!",
      data: {
        name: `${gift.owner.firstName} ${gift.owner.lastName}`,
        gifts: gift.gifts,
        host: req.hostname,
      },
    });
  }
  res.json({
    success: true,
    message: "Wish successfully sent",
    data: gift,
  });
};
