var express = require('express');
var router = express.Router();
var request = require('request');
var rfsCatalogue = require('./rfsCatalogue');
var contexts = require('./contexts');
var vocab = require('./vocab');



router.use('/RFSCatalogue', rfsCatalogue);
router.use('/contexts', contexts);
router.use('/vocab', vocab);

router.get('/', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	var entryPoint={
		  "@context":"http://lesterthomas.ddns.net:3000/api/contexts/EntryPoint.jsonld",
		  "@id": "http://lesterthomas.ddns.net:3000/api/",
		  "@type": "EntryPoint",
		  "RFSCatalogue": "http://lesterthomas.ddns.net:3000/api/RFSCatalogue"
		};
	res.send(JSON.stringify(entryPoint));
	
});


module.exports = router;
