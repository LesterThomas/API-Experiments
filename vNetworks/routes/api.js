var constants=require('./constants');
var express = require('express');
var router = express.Router();
var request = require('request');
var rfsCatalogue = require('./rfsCatalogue');
var contexts = require('./contexts');
var vocab = require('./vocab');

// enable CORS Cross Origin Resource Sharing
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log('Inside API module');
console.log('Testing constants',constants);

router.use(constants.RFSCATALOGUE_ROUTE, rfsCatalogue);
router.use(constants.CONTEXT_ROUTE, contexts);
router.use(constants.VOCAB_ROUTE, vocab);

router.get('/', function(req, res) {
	console.log('GET /api');
	
	var entryPoint={
		  "@context":constants.API_ENTRY_POINT_CONTEXT + "/EntryPoint.jsonld",
		  "@id": constants.API_ENTRY_POINT,
		  "@type": "EntryPoint",
		  "RFSCatalogue": constants.API_ENTRY_POINT_RFSCATALOGUE
		};
	res.contentType("application/ld+json");
	res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
	res.send(JSON.stringify(entryPoint));
	console.log('GET /api complete');
});


module.exports = router;
