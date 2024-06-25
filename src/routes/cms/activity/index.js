const express = require('express');

const ActivityController = require('../../../controller/cms/activity');

const router = express.Router();

// CREATE - POST
router.post('/', ActivityController.useCreate);

// READ - GET
router.get('/', ActivityController.useGet);

router.put('/:id', ActivityController.useUpdate);

router.delete('/:id', ActivityController.useDelete);

module.exports = router;