var constants=require('./constants');
var express = require('express');
var router = express.Router();
var request = require('request');

// enable CORS Cross Origin Resource Sharing
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/EntryPoint.jsonld', function(req, res) {
	console.log('GET /api/contexts/EntryPoint.jsonld');
	
	var context={
		"@context": {
			"hydra": "http://www.w3.org/ns/hydra/core#",
			"vocab": constants.API_ENTRY_POINT_VOCAB + "#",
			"EntryPoint": "vocab:EntryPoint",
			"RFSCatalogue": {
				"@id": "vocab:EntryPoint/RFSCatalogue",
				"@type": "@id"
			}
		}
	};
	res.contentType("application/ld+json");
	res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
	res.send(JSON.stringify(context));
	console.log('GET /api/contexts/EntryPoint.jsonld complete');
	
});

router.get('/RFSCatalogue.jsonld', function(req, res) {
	console.log('GET /api/contexts/RFSCatalogue.jsonld');
	
	
	var context={
		"@context": {
			"hydra": "http://www.w3.org/ns/hydra/core#",
			"vocab": constants.API_ENTRY_POINT_VOCAB + "#",
			"RFSCatalogue": "http://schema.org/RFSCatalogue",
			"name": "http://schema.org/name",
			"description": "http://schema.org/description",
			"features": {
				"@id": "http://schema.org/additionalProperty",
				"@type": "@id"
			}

		}
	};
	res.contentType("application/ld+json");
	res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
	res.send(JSON.stringify(context));
	console.log('GET /api/contexts/RFSCatalogue.jsonld complete');
});


router.get('/Feature.jsonld', function(req, res) {
	console.log('GET /api/contexts/Feature.jsonld');
	
	var context={
		"@context": {
			"hydra": "http://www.w3.org/ns/hydra/core#",
			"vocab": constants.API_ENTRY_POINT_VOCAB + "#",
			"Feature": "http://schema.org/PropertyValue",
			"name": "http://schema.org/name",
			"description": "http://schema.org/description"
		}
	};
	res.contentType("application/ld+json");
	res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
	res.send(JSON.stringify(context));
	console.log('GET /api/contexts/Feature.jsonld complete');
});




module.exports = router;
