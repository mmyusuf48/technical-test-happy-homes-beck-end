const express = require('express');

const UserRateController = require('../../../controller/cms/user-rates');

const router = express.Router();

// CREATE - POST
router.post('/', UserRateController.useCreate);

// READ - GET
router.get('/', UserRateController.useGet);


module.exports = router;