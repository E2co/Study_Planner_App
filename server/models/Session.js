const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    examId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    subject: String,
    topic: String,
    icon: String,
    color: String,
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Session', sessionSchema);