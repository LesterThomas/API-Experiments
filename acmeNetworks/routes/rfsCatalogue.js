var express = require('express');
var router = express.Router();
var request = require('request');



router.get('/', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	request('http://localhost:5984/acmenetworks/_all_docs?startkey="RFSCatalogue"&endkey="RFSCatalogue:99999"&include_docs=true', function (error, response, body) {
		var rfsCatalogueArray=[];
		if (!error && response.statusCode == 200) {
			var rfsCatalogue=JSON.parse(body);
		  	console.log(rfsCatalogue); 
		  	
		  	for(var i=0; i<rfsCatalogue.rows.length; i++) {
		  		var catalogueItem=rfsCatalogue.rows[i].doc;
		  		catalogueItem['@id']='http://lesterthomas.ddns.net:3000/api/' + catalogueItem._id.replace(':','/');
		  		catalogueItem['@type']='RFSCatalogue';
		  		delete catalogueItem._id;
		  		delete catalogueItem._rev;
		  		delete catalogueItem.description;
		  		rfsCatalogueArray.push(catalogueItem);
		  	}

		  	var outputJsonLd={ "@context":["http://schema.org/",{
				hydra: "http://www.w3.org/ns/hydra/core#",
				vocab: "http://lesterthomas.ddns.net:3000/api/vocab#",
				RFSCatalogueCollection: "vocab:RFSCatalogueCollection",
				members: "http://www.w3.org/ns/hydra/core#member"
				}],
				"@type": "RFSCatalogueCollection",
	  			"@id": "http://lesterthomas.ddns.net:3000/api/RFSCatalogue/",
	  			members:rfsCatalogueArray
			};
		}
		res.send(JSON.stringify(outputJsonLd));
	})
  
});



router.get('/:rfsId', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	console.log('Send db request','http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId);
	request('http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId, function (error, response, body) {
	
		if (!error && response.statusCode == 200) {
			var rfsCatalogueItem=JSON.parse(body);
		  	console.log(rfsCatalogueItem); 
		  	rfsCatalogueItem['@id']='http://lesterthomas.ddns.net:3000/api/' + rfsCatalogueItem._id.replace(':','/');
		  	rfsCatalogueItem['@type']='RFSCatalogue';
		  	delete rfsCatalogueItem._id;
		  	delete rfsCatalogueItem._rev;
	 
		  	var outputJsonContext='http://schema.org/';
			rfsCatalogueItem['@context']=outputJsonContext;
			res.send(JSON.stringify(rfsCatalogueItem));
		}
	
	});

});



module.exports = router;
