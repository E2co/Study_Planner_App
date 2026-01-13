const Session = require('../models/Session');
const Exam = require('../models/Exam');

// @desc    Get current study schedule
// @route   GET /api/schedule
const getSchedule = async (req, res) => {
    try {
        // Return sessions sorted by date
        const sessions = await Session.find({}).sort({ date: 1 });
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
        if (session) {
            session.completed = !session.completed;
            const updatedSession = await session.save();
            res.json(updatedSession);
        } else {
            res.status(404).json({ message: 'Session not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Generate/Regenerate Smart Schedule
// @route   POST /api/schedule/generate
const generateSchedule = async (req, res) => {
    try {
        // 1. Clear future incomplete sessions (keep history)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        await Session.deleteMany({ 
            date: { $gte: today },
            completed: false 
        });

        // 2. Fetch all active exams
        const exams = await Exam.find({ date: { $gte: today } });

        let newSessions = [];

        // 3. The Scheduling Algorithm
        exams.forEach(exam => {
            const examDate = new Date(exam.date);
            examDate.setHours(0,0,0,0);
            
            // Calculate time window
            const timeDiff = examDate.getTime() - today.getTime();
            const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            if (daysUntil <= 0) return;

            // Logic: Distribute study hours
            const hoursPerSession = 2; // Default block size
            const sessionsNeeded = Math.ceil(exam.studyHours / hoursPerSession);
            
            // "Smart" Spacing: Don't cram everything today. Spread it out.
            // Priority Multiplier could be added here (High priority = earlier sessions)
            const interval = Math.max(1, Math.floor((daysUntil - 1) / sessionsNeeded));
            
            for (let i = 0; i < sessionsNeeded; i++) {
                const sessionDate = new Date(today);
                // Spread sessions by the interval
                sessionDate.setDate(today.getDate() + (i * interval));

                // Stop if we hit the exam date
                if (sessionDate >= examDate) break;

                newSessions.push({
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

        // 4. Save all new sessions
        if (newSessions.length > 0) {
            await Session.insertMany(newSessions);
        }

        const fullSchedule = await Session.find({}).sort({ date: 1 });
        res.json(fullSchedule);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSchedule, toggleSession, generateSchedule };