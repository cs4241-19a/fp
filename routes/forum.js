const express = require('express');
const router = express.Router();

const frontendRouter = require('./frontend');
const backendRouter = require('./backend/backend');

router.use('/', frontendRouter);
router.use('/backend', backendRouter);

module.exports=router;