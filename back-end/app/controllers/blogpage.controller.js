const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Blog = db.Blog;

// Create and Save a new Blog
exports.create = async (req, res, next) => {
    // Validate request
    if (!req.body.title) {
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    // Create a Blog
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        authorname: req.body.authorname,
        currenttime: req.body.currenttime,
        ownerId: req.userId,
    });

    // Save Blog in the database
    const [error, document] = await handle(Blog.save());

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the Blog"
            )
        );
    }

    return res.send(document);
};

// Retrieve all Blogs of a user from the database
exports.findAll = async (req, res, next) => {
    const condition = { ownerId: req.userId };
    const title = req.query.title;
    const author = req.query.authorname;
    if (title) {
        condition.title = { $regex: new RegExp(title), $options: "i" };
    }

    else if(author) {
        condition.author = { $regex: new RegExp(author), $options: "i" };
    }
    const [error, documents] = await handle(
        Blog.find(condition, "-ownerId")
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving Blogs"
            )
        );
    }

    return res.send(documents);
};

// Find a single Blog with an id
exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Blog.findOne(condition, "-ownerId")
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving Blog with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Blog not found"));
    }

    return res.send(document);
};

// Update a Blog by the id in the request
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Data to update can not be empty")
        );
    }

    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Blog.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error updating Blog with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Blog not found"));
    }

    return res.send({ message: "Blog was updated successfully" });
};

// Delete a Blog with the specified id in the request
exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Blog.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Could not delete Blog with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Blog not found"));
    }

    return res.send({ message: "Blog was deleted successfully" });
};

// Delete all Blogs of a user from the database
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handle(
        Blog.deleteMany({ ownerId: req.userId })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while removing all Blogs"
            )
        );
    }

    return res.send({
        message: `${data.deletedCount} Blogs were deleted successfully`,
    });
};

