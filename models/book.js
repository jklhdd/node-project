var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: Number,

    price: {
        type: Number,
        required: true
    },
    imageUrl: String,
    status: Number
});
var book = mongoose.model('book', bookSchema);

module.exports = book;