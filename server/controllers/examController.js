const Exam = require('../models/Exam');
const Session = require('../models/Session');

// @desc    Get all exams
// @route   GET /api/exams
const getExams = async (req, res) => {
    try {
        const exams = await Exam.find({});
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new exam
// @route   POST /api/exams
const addExam = async (req, res) => {
    try {
        const { subject, topic, date, time, priority, studyHours, icon, color } = req.body;
        
        const exam = await Exam.create({
            subject,
            topic,
            date,
            time,
            priority,
            studyHours,
            icon,
            color,
            user: req.user.id // Attach the user ID from the token
        });

        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete exam and its associated study sessions
// @route   DELETE /api/exams/:id
const deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // Check for user ownership
        if (exam.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await Session.deleteMany({ examId: exam._id }); 
        await exam.deleteOne();
        res.json({ message: 'Exam removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getExams, addExam, deleteExam };