const { UserModel, GiftModel } = require("../models/user");

  exports.getReport = async (req, res, next) => {
    const docs = await GiftModel.find().populate("owner", "-password");

    res.json({
      success: true,
      message: "report retrieved",
      data: docs
    })
}

exports.getStats = async (req, res,next) => {
const stats= {}
  const gifts = await GiftModel.find({}).populate("owner", "-password");
  // GENDER
  stats.totalMale = gifts.filter(gift=>gift.owner.gender==='male').length
  stats.totalFemale = gifts.filter(gift=>gift.owner.gender==='female').length
  stats.totalNonBinary = gifts.filter(gift=>gift.owner.gender==='non-binary').length
  
  // SEND STATUS
  stats.totalSent = gifts.filter(gift=>gift.isSent===true).length
  stats.totalUnsent = gifts.filter(gift=>gift.isSent===false).length
  stats.totalSharedToWhatsapp = gifts.filter(gift=>gift.via==="whatsapp").length
  stats.totalSentToMail = gifts.filter(gift=>gift.via==="mail").length

  res.json({
    success: true,
    message: "Stats retrieved successfully",
    data: stats
  })
}