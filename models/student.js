var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    id: Number,

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,           //cam trung
        required: true,
        trim: true
    },

    score: {
        type: Number,
        required: true
    },
    imageUrl: String,
    status: Number
});
var Student = mongoose.model('student', StudentSchema);

module.exports = Student;