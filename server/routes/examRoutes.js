const express = require('express');
const router = express.Router();
const { getExams, addExam, deleteExam } = require('../controllers/examController');

router.get('/', getExams);
router.post('/', addExam);
router.delete('/:id', deleteExam);

module.exports = router;