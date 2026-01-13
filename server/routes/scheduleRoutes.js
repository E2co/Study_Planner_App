const express = require('express');
const router = express.Router();
const { getSchedule, generateSchedule, toggleSession } = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getSchedule);
router.post('/generate', protect, generateSchedule);
router.put('/:id/toggle', protect, toggleSession);

module.exports = router;