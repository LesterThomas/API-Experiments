var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/EntryPoint.jsonld', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	var context={
		"@context": {
			"hydra": "http://www.w3.org/ns/hydra/core#",
			"vocab": "http://lesterthomas.ddns.net:3000/api/vocab#",
			"EntryPoint": "vocab:EntryPoint",
			"RFSCatalogue": {
				"@id": "vocab:EntryPoint/RFSCatalogue",
				"@type": "@id"
			}
		}
	};
	res.send(JSON.stringify(context));

});

router.get('/RFSCatalogue.jsonld', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	var context={
		"@context": {
			"hydra": "http://www.w3.org/ns/hydra/core#",
			"vocab": "http://lesterthomas.ddns.net:3000/api/vocab#",
			"RFSCatalogue": "http://schema.org/RFSCatalogue",
			"name": "http://schema.org/name",
			"description": "http://schema.org/description"
		}
	};
	res.send(JSON.stringify(context));

});





module.exports = router;
