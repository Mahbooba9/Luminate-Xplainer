const express = require('express');
const router = express.Router();
const { generateTopic, getHistory, getHistoryItem, toggleBookmark } = require('../controllers/topicController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateTopic);
router.get('/history', protect, getHistory);
router.get('/history/:id', protect, getHistoryItem);
router.put('/history/:id/bookmark', protect, toggleBookmark);

module.exports = router;
