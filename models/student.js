var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    id: Number,

    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    score: {
        type: Number,
        required: true
    },

    status: Number
});
var Student = mongoose.model('student', StudentSchema);

module.exports = Student;