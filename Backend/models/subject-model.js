const mongoose = require('mongoose');
// const User = require("./user-model");

const subjectSchema = new mongoose.Schema({
    name: String,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  }],
    // studentId: { type: String, unique: true }, // Unique identifier for subject
    timetable: [{ day: String, startTime: String, endTime: String }],
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;