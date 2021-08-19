module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', {}, {
    tableName: 'PostsCategories',
    timestamps: false,
  });
  PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'usersCategory',
      through: PostCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId' });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPostsCategory',
      through: PostCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategorie;
};