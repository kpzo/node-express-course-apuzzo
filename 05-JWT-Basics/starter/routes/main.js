const express = require('express');
const router = express.Router()

const { login, dashboard } = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

// protected by authMiddleware
// put authenticationMiddleware before any route that needs to be protected
router.route('/dashboard').get(authMiddleware, dashboard)

// for public access
router.route('/login').post(login)

module.exports = router