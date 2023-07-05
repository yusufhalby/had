/**

project.js
This file defines the project routes for the API application using Express.js.
Authentication and authorization middleware isAuth are applied to specific routes.
*/

// Import required modules
const express = require('express');

const logController = require('../controllers/log');
const diagnoseController = require('../controllers/diagnose');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


// Logs routes
router.get('/ai/logs', logController.getAiLogs);

router.get('/logs/:userId', logController.getLogs);

router.post('/logs', isAuth, logController.postLog);


router.put('/ai/diagnose', diagnoseController.putDiagnose);

router.get('/diagnose/:userId', diagnoseController.getDiagnose)

module.exports = router;
