const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    status: String, // 'present' or 'absent'
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;