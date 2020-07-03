const mongoose = require('mongoose');
//Create Schema
const InfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
});
//Create and instantiate model with schema
const database = mongoose.model("Info", InfoSchema);
module.exports = database;