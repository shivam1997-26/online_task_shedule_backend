

const mongoose = require('mongoose')

const lectureSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'instructors' },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('lectures', lectureSchema)