module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, "Contact name is required"],
            },
            email: {
                type: String,
                trim: true,
                lowercase: true,
            },
            address: String,
            phone: String,
            favorite: Boolean,
            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
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

    return mongoose.model("contact", schema);
};
