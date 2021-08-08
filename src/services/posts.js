const { BlogPost } = require('../models');

const create = async (req) => {
    const { body, user } = req;
    const { title, content, categoryIds } = body;
    const post = await BlogPost.create({ title, content, userId: user });
    return {
      status: 201,
      id: post.id,
      userId: post.userId,
      title: post.title,
      content: post.content,
    };
  };

module.exports = { create };