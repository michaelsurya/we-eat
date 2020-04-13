const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MenuSchema = new schema({
    name: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = MenuSchema;