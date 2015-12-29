var express = require('express');
var router = express.Router();
var catalogue = require('./catalogue');
var integrationPoints = require('./integrationPoint');



router.use('/catalogue', catalogue);
router.use('/integrationPoint', integrationPoints);



module.exports = router;
