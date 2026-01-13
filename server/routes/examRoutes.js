const express = require('express');
const router = express.Router();
const { getExams, addExam, deleteExam } = require('../controllers/examController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getExams);
router.post('/', protect, addExam);
router.delete('/:id', protect, deleteExam);

module.exports = router;