const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    examId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    //Copied these fields to make fetching for the frontend faster.
    subject: String,
    topic: String,
    icon: String,
    color: String,

    date: {
        type: Date,
        required: true
    },
    duration: { 
        type: Number, 
        required: true 
    },
    completed: { 
        type: Boolean, 
        default: false 
    }
});

module.exports = mongoose.model('Session', sessionSchema);