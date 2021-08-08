const posts = require('../services/posts.js');

const create = async (req, res) => {
  const { status, ...jsonResponse } = await posts.create(req);
  res.status(status).json(jsonResponse);
};

module.exports = { create };