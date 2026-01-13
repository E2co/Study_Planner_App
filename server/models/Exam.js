const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    subject: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    topic: { 
        type: String, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'medium' 
    },
    studyHours: { 
        type: Number, 
        required: true
    },
    icon: { 
        type: String, 
        default: "📚" 
    },
    color: { 
        type: String, 
        default: "#667eea" 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Exam', examSchema);