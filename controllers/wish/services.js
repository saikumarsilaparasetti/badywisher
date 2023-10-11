const logger = require("../../logger");
const { WishModel } = require("../../models");

const services = {
  createObject: async (wish) => {
    try {
      return await WishModel.create(wish);
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  },

  aggregate: async (pipeline) => {
    try {
      return await WishModel.aggregate(pipeline);
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  },
  getAllObjects: async (filters) => {
    try {
      const query = filters["query"] ? filters["query"] : {};
      const selectFrom = filters["selectFrom"] ? filters["selectFrom"] : {};
      const sortBy = filters["sortBy"] ? filters["sortBy"] : { _id: -1 };
      const pageNum = filters["pageNum"] ? filters["pageNum"] : 1;
      const pageSize = filters["pageSize"] ? filters["pageSize"] : 50;
      const populatedQuery = filters["populatedQuery"]
        ? filters["populatedQuery"]
        : [];
      return await WishModel.find(query)
        .select(selectFrom)
        .populate(populatedQuery)
        .select(selectFrom)
        .sort(sortBy)
        .skip((pageNum - 1) * pageSize)
        .limit(parseInt(pageSize))
        .lean()
        .exec();
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = services;
