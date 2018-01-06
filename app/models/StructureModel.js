
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bstSchema = new Schema({
    owner: {
        type: String,
        required: true,
        unique: false,
        default: "Default"
    },
    title: {
        type: String,
        required: true,
        default: "UNTITLED",

    },
    values: [{
        type: String,
        required: false,
    }],
    dataType: {
        type: String,
        required: false,
    },
    structureType: {
        type: Number,
        required: true,
        default: 0,
    },
    created_at: Date
});

var structure = mongoose.model('structure', bstSchema);

module.exports = structure;