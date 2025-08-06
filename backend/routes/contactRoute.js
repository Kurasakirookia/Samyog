const express = require('express');
const router = express.Router();
const { sendEmail } = require("../controllers/constactController");

// Contact form should be publicly accessible (no authentication required)
router.post('/send', sendEmail);

module.exports = router;