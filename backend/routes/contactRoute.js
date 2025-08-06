const express = require('express');
const router = express.Router();
const { sendEmail } = require("../controllers/constactController");
const { protect } = require("../middleware/authMiddleware");
// Apply the middleware **only** to this route:
router.post('/send', protect, sendEmail);

module.exports = router;