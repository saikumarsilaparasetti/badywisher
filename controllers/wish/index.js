const logger = require("../../logger");
const { errorResponse, successResponse } = require("../utils");
const wishServices = require("./services");
const { triggerMail } = require("../utils/mailer");
const { default: mongoose } = require("mongoose");
const controller = {
  createWish: async (req, res) => {
    try {
      const { name, wish, dob, phone, email } = req.body;
      const wishCreated = await wishServices.createObject({
        name,
        wish,
        dob: new Date(dob),
        phone,
        email,
      });

      return wishCreated
        ? successResponse(res, wishCreated)
        : errorResponse(res, "Couldnt create wish");
    } catch (error) {
      console.error(error);
      return errorResponse(res, error.message);
    }
  },
  deleteWish: async (req, res) => {
    try {
      const { wishId, phone } = req.body;
      if (!wishId && !phone) {
        return errorResponse(res, "Please provide phone number and wishId");
      }

      const wish = await wishServices.findOneByQuery({
        _id: new mongoose.Types.ObjectId(wishId),
        phone,
      });
      if (!wish) {
        return errorResponse(res, "Wish doesnt exist with given details");
      }

      const updatedWish = await wishServices.update(
        { _id: wish._id },
        {
          isDeleted: true,
        }
      );
      return updatedWish
        ? successResponse(res, updatedWish)
        : errorResponse(res, "Couldnt update the wish");
    } catch (error) {
      logger.error(error);
      return errorResponse(res, error.message);
    }
  },
  getAll: async (req, res) => {
    try {
      const wishes = await wishServices.getAllObjects({});
      return successResponse(res, wishes);
    } catch (error) {
      logger.error(error);
      return errorResponse(res, error.message);
    }
  },
  checkAndWish: async () => {
    try {
      const allWishes = await wishServices.getAllObjects({});
      const todayWishes = allWishes.filter((wish) => {
        return isSameDay(new Date(), wish.dob);
      });
      logger.info(todayWishes);
      await Promise.all(
        todayWishes.map(async (wish) => {
          const mail = {};
          mail.to = wish.email;
          mail.html = wish.wish;
          mail.subject = wish.subject;
          await triggerMail(mail);
        })
      );
    } catch (error) {
      logger.error(error);
      return errorResponse(res, error.message);
    }
  },
};

module.exports = controller;

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
