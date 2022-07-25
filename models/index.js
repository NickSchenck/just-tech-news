const Vote = require("./Vote");
const User = require("./User");
const Post = require("./Post");

//create associations between User and Post models
User.hasMany(Post, {
    foreignKey: "user_id"
});
//belongsToMany create associations between User and Post models through voting, to see which users voted on a single post or to see which posts a single user voted on
User.belongsToMany(Post, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "user_id"
});
User.hasMany(Vote, {
    foreignKey: "user_id"
});
Post.belongsToMany(User, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "post_id"
});
//defines the relationship of Post to User model, this is saying Post can belong to one User not many
Post.belongsTo(User, {
    foreignKey: "user_id",
});
Post.hasMany(Vote, {
    foreignKey: "post_id"
});
Vote.belongsTo(User, {
    foreignKey: "user_id"
});
Vote.belongsTo(Post, {
    foreignKey: "post_id"
});

module.exports = { User, Post, Vote };