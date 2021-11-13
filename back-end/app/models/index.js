const mongoose = require("mongoose");
const createContactModel = require("./contact.model");
const createUserModel = require("./user.model");
const creatBlogModel = require("./blogpage.model");
const db = {};

db.mongoose = mongoose;
db.Contact = createContactModel(mongoose);
db.User = createUserModel(mongoose);
db.Blog = creatBlogModel(mongoose);

module.exports = db;
