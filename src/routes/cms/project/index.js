const express = require('express');

const ProjectController = require('../../../controller/cms/project');

const router = express.Router();

// CREATE - POST
router.post('/', ProjectController.useCreate);

// READ - GET
router.get('/', ProjectController.useGet);

module.exports = router;