const Session = require('../models/Session');
const Exam = require('../models/Exam');

// @desc    Get current study schedule
// @route   GET /api/schedule
const getSchedule = async (req, res) => {
    try {
        // Return ONLY this user's sessions sorted by date
        const sessions = await Session.find({ user: req.user.id }).sort({ date: 1 });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle session completion status
// @route   PUT /api/schedule/:id/toggle
const toggleSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });

        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        session.completed = !session.completed;
        const updatedSession = await session.save();
        res.json(updatedSession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Generate/Regenerate Smart Schedule
// @route   POST /api/schedule/generate
const generateSchedule = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // 1. Delete ONLY this user's future incomplete sessions
        await Session.deleteMany({ 
            user: req.user.id,
            date: { $gte: today },
            completed: false 
        });

        // 2. Fetch ONLY this user's exams
        const exams = await Exam.find({ 
            user: req.user.id,
            date: { $gte: today } 
        });

        let newSessions = [];

        exams.forEach(exam => {
            const examDate = new Date(exam.date);
            examDate.setHours(0,0,0,0);
            const timeDiff = examDate.getTime() - today.getTime();
            const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            if (daysUntil <= 0) return;

            const hoursPerSession = 2; 
            const sessionsNeeded = Math.ceil(exam.studyHours / hoursPerSession);
            const interval = Math.max(1, Math.floor((daysUntil - 1) / sessionsNeeded));
            
            for (let i = 0; i < sessionsNeeded; i++) {
                const sessionDate = new Date(today);
                sessionDate.setDate(today.getDate() + (i * interval));
                if (sessionDate >= examDate) break;

                newSessions.push({
                    user: req.user.id, // IMPORTANT: tag session with user ID
                    examId: exam._id,
                    subject: exam.subject,
                    topic: exam.topic,
                    icon: exam.icon,
                    color: exam.color,
                    date: sessionDate,
                    duration: Math.min(hoursPerSession, exam.studyHours - (i * hoursPerSession)),
                    completed: false
                });
            }
        });

        if (newSessions.length > 0) {
            await Session.insertMany(newSessions);
        }

        const fullSchedule = await Session.find({ user: req.user.id }).sort({ date: 1 });
        res.json(fullSchedule);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSchedule, toggleSession, generateSchedule };