
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var binarySearchTreeSchema = new Schema({
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
    type: {
        type: Number,
        required: false,
    },
    created_at: Date
});

var bstModel = mongoose.model('bstModel', binarySearchTreeSchema);

module.exports = bstModel;