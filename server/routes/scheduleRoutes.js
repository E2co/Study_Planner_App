const express = require('express');
const router = express.Router();
const { getSchedule, generateSchedule, toggleSession } = require('../controllers/scheduleController');

router.get('/', getSchedule);
router.post('/generate', generateSchedule);
router.put('/:id/toggle', toggleSession);

module.exports = router;