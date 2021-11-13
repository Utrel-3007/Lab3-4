module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: {
                type: String,
                required: [true, "Title is required"],
            },
            content: {
                type: String,
            },
            authorname: {
                type: String,
            },
            currenttime: {
                type: Date, 
                require: true, 
                default: Date.now,
            },
        },
        { timestamps: true }
    );

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("blogpage", schema);
};
