const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getSettings, updateSettings } = require('../controllers/settingsController');

// GET /api/settings — public (site components fetch this)
router.get('/', getSettings);

// PUT /api/settings — admin only
router.put('/', authMiddleware, updateSettings);

module.exports = router;
