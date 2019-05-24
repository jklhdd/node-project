var mongoose = require('mongoose');

var classSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: Number,
    status: Number

});
var Classroom = mongoose.model('class', classSchema);

module.exports = Classroom;