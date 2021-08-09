const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const CATEGORY_NOT_FOUND = { status: 400, message: '"categoryIds" not found' };
const POST_NOT_FOUND = { status: 404, message: 'Post does not exist' };
const UNAUTHORIZED_USER = { status: 401, message: 'Unauthorized user' };

const verifyIfCategoryExists = async (categoryIds) => {
  const catExists = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  // [Op.in]: [1, 2],  ==== SQL IN [1, 2]
  if (catExists.length === categoryIds.length) return true;
  return false;
};

const createPost = async (newPost, userId) => {
  const { categoryIds, title, content } = newPost;
  const categoryExists = await verifyIfCategoryExists(categoryIds);
  if (!categoryExists) throw CATEGORY_NOT_FOUND;
  await BlogPost.create({ title, content, userId });
  const blogPost = await BlogPost.findOne({ where: { title, content, userId } });
  console.log(blogPost);
  return blogPost;
};

const getAllPosts = async () => {
  const blogPosts = await BlogPost.findAll({ include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories' },
  ] });
  return blogPosts;
};

const getPostById = async (id) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories' },
  ] });
  if (!blogPost) throw POST_NOT_FOUND;
  return blogPost;
};

const verifyPostAuthor = async (postId, userId) => {
  const postToUpdate = await getPostById(postId);
  const user = postToUpdate.userId;
  if (user === userId) return true;
};

const updatePost = async (postId, userId, newInfo) => {
  const { title, content } = newInfo;
  const authorized = await verifyPostAuthor(postId, userId);
  if (!authorized) throw UNAUTHORIZED_USER;
  await BlogPost.update({ title, content }, { where: { id: postId } });
  const updatedPost = await getPostById(postId);
  return updatedPost;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};