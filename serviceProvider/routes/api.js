var express = require('express');
var router = express.Router();
var catalogue = require('./catalogue');
var integrationPoints = require('./integrationPoint');



router.use('/catalogue', catalogue);
router.use('/integrationPoint', integrationPoints);

router.get('/', function(httprequest, httpresponse) {
	httpresponse.contentType("application/json");
	var objectResp={ catalogue:"http://serviceprovider.com:3002/api/catalogue", integrationPoints:"http://serviceprovider.com:3002/api/integrationPoint"};
	httpresponse.send(JSON.stringify(objectResp));
});

module.exports = router;
