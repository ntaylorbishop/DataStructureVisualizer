
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var binarySearchTreeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    values: [{
        value: Number,
        required: false,
        unique: false
    }],
    created_at: Date
});

var BSTModel = mongoose.model('BSTModel', binarySearchTreeSchema);

module.exports = BSTModel;