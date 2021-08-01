const userService = require('../services/userService');

const create = async (req, res, next) => {
  try {
    const token = await userService.create(req.body);
    return res.status(201).json(token);
    // return res.end();
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const infos = await userService.getAll();
    return res.status(200).json(infos);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};
