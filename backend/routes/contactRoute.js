const express = require('express');
const router = express.Router();
const { sendEmail } = require("../controllers/constactController");
const { protect } = require("../middleware/authMiddleware");

// Contact form requires user authentication
router.post('/send', protect, sendEmail);

module.exports = router;