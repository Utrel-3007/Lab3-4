const express = require("express");
const blog = require("../controllers/blogpage.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    router.use(middlewares.verifyToken);

    router.post("/myblog/", blog.create);
    router.get("/myblog/", blog.findAll);
    router.get("/myblog/:id", blog.findOne);
    router.put("/myblog/:id", blog.update);
    router.delete("/myblog/:id", blog.delete);
    router.delete("/myblog/", blog.deleteAll);

    app.use("/api/blog", router);
};
