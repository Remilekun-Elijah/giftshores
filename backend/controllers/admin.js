const { GiftModel } = require("../models/user");
const dayjs = require("dayjs");

const returnSearch = (words) => {
  return {
    $regex: new RegExp(`.*${words}*.`),
    $options: "i",
  };
};
exports.getReport = async (req, res, next) => {
  try {
    let {
        search,
        pageSize,
        pageNumber,
        gender,
        country,
        isSent,
        via,
        ...date
      } = req.query,
      firstName,
      lastName;

    if (search) firstName = returnSearch(search.split(" ")[0] || "");
    if (search)
      lastName =
        search.split(" ")[1] && returnSearch(search.split(" ")[1] || "");

    pageSize = pageSize || Infinity;
    pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;
    const limit = Number(pageSize),
      skip = pageNumber * pageSize;
    let docs,
      filterA = {},
      filterB = {},
      pageCount;

    if (gender) filterA.gender = gender;
    if (country) filterA.country = country;
    if (isSent) filterB.isSent = isSent;
    if (via) filterB.via = via;
    if (via) filterB.via = via;
    if (search) filterA.$or = [{ firstName }, { lastName: firstName }];
    if (search && search.split(" ")[1])
      filterA.$or = [{ firstName }, { lastName }];
    if (date.startDate && date.endDate) {
      filterB.createdAt = { $gte: date.startDate, $lte: date.endDate };
    }

    const giftModel = new GiftModel();
    if (gender || country || search) {
      const filtered = await giftModel.findByGenderOrCountry({
        filterA,
        filterB,
        limit,
        skip,
        pageCount,
      });
      const { result, count } = filtered;
      docs = result;
      pageCount = count;
    } else {
      docs = await GiftModel.find(filterB)
        .populate("owner", "-password")
        .limit(limit)
        .skip(skip)
        .sort({
          createdAt: -1,
        });
      pageCount = await GiftModel.countDocuments({ ...filterB });
    }

    const data = {
      reports: docs,
      perPage: docs.length,
      count: pageCount,
    };

    if (req.query.download) {
      const jsonArr = docs.map(({ owner, _doc }) => {
        return {
          NAME: owner.firstName + " " + owner.lastName,
          "EMAIL ADDRESS": owner.email,
          GENDER: owner.gender,
          COUNTRY: owner.country,
          GIFTS: _doc.gifts.join(", "),
          PURPOSE: _doc.purpose,
          STATUS: _doc.isSent ? "Sent" : "Not Sent",
          "SENT VIA": _doc.via,
          DATE: dayjs(_doc.createAt).format("DD/MM/YYYY"),
          RECEIVERS: _doc.recipients.join(", "),
        };
      });
      res.xls("reports.xlsx", jsonArr);
    } else {
      res.json({
        success: true,
        message: "report retrieved",
        data: data,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = {};
    const gifts = await GiftModel.find({}).populate("owner", "-password");
    // GENDER
    stats.totalMale = gifts.filter(
      (gift) => gift.owner.gender === "male"
    ).length;
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
      {
        $sort: { _id: 1 },
      },
    ]);

    res.json({
      success: true,
      message: "Stats retrieved successfully",
      data: { stats, analytics },
    });
  } catch (err) {
    next(err);
  }
};
