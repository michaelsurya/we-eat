const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ImageSchema = new schema({
    imageName: {
        type: String,
        default: "none",
        required : true
    },
    imageData: {
        type: String,
        required: true
    }
})

module.exports = ImageSchema;