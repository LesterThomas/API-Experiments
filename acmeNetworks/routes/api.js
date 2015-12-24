var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
	var entryPoint={
		  "@context":["http://schema.org/",{
				hydra: "http://www.w3.org/ns/hydra/core#",
				"EntryPoint": "vocab:EntryPoint"
				}],
		  "@id": "http://acmenetworks.com:3000/api/",
		  "@type": "EntryPoint",
		  "ResourceFacingServiceCatalogue": "http://acmenetworks.com:3000/api/ResourceFacingServiceCatalogue"
		};
	res.send(JSON.stringify(entryPoint));
	
});


router.get('/ResourceFacingServiceCatalogue', function(req, res) {
	
	request('http://localhost:5984/acmenetworks/_all_docs?startkey="ResourceFacingServiceCatalogue"&endkey="ResourceFacingServiceCatalogue:99999"&include_docs=true', function (error, response, body) {
		var rfsCatalogueArray=[];
		if (!error && response.statusCode == 200) {
			var rfsCatalogue=JSON.parse(body);
		  	console.log(rfsCatalogue); 
		  	
		  	for(var i=0; i<rfsCatalogue.rows.length; i++) {
		  		var catalogueItem=rfsCatalogue.rows[i].doc;
		  		catalogueItem['@id']='http://acmenetworks.com:3000/api/' + catalogueItem._id.replace(':','/');
		  		catalogueItem['@type']='ResourceFacingServiceCatalogue';
		  		delete catalogueItem._id;
		  		delete catalogueItem._rev;
		  		delete catalogueItem.description;
		  		rfsCatalogueArray.push(catalogueItem);
		  	}

		  	var outputJsonLd={ "@context":["http://schema.org/",{
				hydra: "http://www.w3.org/ns/hydra/core#",
				Collection: "http://www.w3.org/ns/hydra/core#Collection",
				members: "http://www.w3.org/ns/hydra/core#member"
				}],
				"@type": "Collection",
	  			"@id": "http://http://acmenetworks.com:3000/api/ResourceFacingServiceCatalogue/",
	  			members:rfsCatalogueArray
			};
		}
		res.send(JSON.stringify(outputJsonLd));
	})
  
});



router.get('/ResourceFacingServiceCatalogue/:rfsId', function(req, res) {
	console.log('Send db request','http://localhost:5984/acmenetworks/ResourceFacingServiceCatalogue:' + req.params.rfsId);
	request('http://localhost:5984/acmenetworks/ResourceFacingServiceCatalogue:' + req.params.rfsId, function (error, response, body) {
	
		if (!error && response.statusCode == 200) {
			var rfsCatalogueItem=JSON.parse(body);
		  	console.log(rfsCatalogueItem); 
		  	rfsCatalogueItem['@id']='http://acmenetworks.com:3000/api/ResourceFacingServiceCatalogue' + rfsCatalogueItem._id.replace(':','/');
		  	rfsCatalogueItem['@type']='ResourceFacingServiceCatalogue';
		  	delete rfsCatalogueItem._id;
		  	delete rfsCatalogueItem._rev;
	 
		  	var outputJsonContext='http://schema.org/';
			rfsCatalogueItem['@context']=outputJsonContext;
			res.send(JSON.stringify(rfsCatalogueItem));
		}
	
	});

});

module.exports = router;
