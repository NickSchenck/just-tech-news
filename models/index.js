const User = require("./User");
const Post = require("./Post");

//create associations between User and Post models
User.hasMany(Post, {
    foreignKey: "user_id"
});
//defines the relationship of Post to User model, this is saying Post can belong to one User not many
Post.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = { User, Post };