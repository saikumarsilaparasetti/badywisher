const logger = require("../../logger");
const { errorResponse, successResponse } = require("../utils");
const wishServices = require("./services");

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
  getAll: async (req, res) => {
    try {
      const wishes = await wishServices.getAllObjects({});
      return successResponse(res, wishes);
    } catch (error) {
      logger.error(error);
      return errorResponse(res, error.message);
    }
  },
};

module.exports = controller;
