const { GiftModel } = require("../models/user");
const dayjs = require("dayjs");

exports.getReport = async (req, res, next) => {
  let { pageSize, pageNumber, gender, country, isSent, via } = req.query;

  pageSize = pageSize || Infinity;
  pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;
  const limit = Number(pageSize),
    skip = pageNumber * pageSize;
  let docs,
    filterA = {},
    filterB = {};

  if (gender) filterA.gender = gender;
  if (country) filterA.country = country;
  if (isSent) filterB.isSent = isSent;
  if (via) filterB.via = via;

  const giftModel = new GiftModel();
  if (gender || country) {
    docs = await giftModel.findByGenderOrCountry({
      filterA,
      filterB,
      limit,
      skip,
    });
  } else {
    docs = await GiftModel.find(filterB)
      .populate("owner", "-password")
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });
    // .exec();
  }

  const pageCount = await GiftModel.countDocuments(),
    data = {
      reports: docs,
      // totalPages: Math.ceil(pageCount / pageSize) || 1,
      // page: parseInt(pageNumber) + 1,
      perPage: docs.length,
      count: pageCount,
    };

  res.json({
    success: true,
    message: "report retrieved",
    data: data,
  });
};

exports.getStats = async (req, res, next) => {
  const stats = {};
  const gifts = await GiftModel.find({}).populate("owner", "-password");
  // GENDER
  stats.totalMale = gifts.filter((gift) => gift.owner.gender === "male").length;
  stats.totalFemale = gifts.filter(
    (gift) => gift.owner.gender === "female"
  ).length;
  stats.totalNonBinary = gifts.filter(
    (gift) => gift.owner.gender === "non-binary"
  ).length;

  // SEND STATUS
  stats.totalSent = gifts.filter((gift) => gift.isSent === true).length;
  stats.totalUnsent = gifts.filter((gift) => gift.isSent === false).length;
  stats.totalSharedToWhatsapp = gifts.filter(
    (gift) => gift.via === "whatsapp"
  ).length;
  stats.totalSentToMail = gifts.filter((gift) => gift.via === "mail").length;

  stats.totalReport = gifts.length;

  const analytics = await GiftModel.aggregate([
    {
      $match: {
        dateAdded: {
          $gte: dayjs(dayjs().startOf("month").toISOString()).format(
            "DD/MM/YYYY"
          ),
        },
      },
    },
    {
      $group: { _id: "$dateAdded", totalCount: { $sum: 1 } },
    },
  ]);

  res.json({
    success: true,
    message: "Stats retrieved successfully",
    data: { stats, analytics },
  });
};
