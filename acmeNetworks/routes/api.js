var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');


	 
	var entryPoint={
		  "@context":"http://lesterthomas.ddns.net:3000/api/contexts/EntryPoint.jsonld",
		  "@id": "http://lesterthomas.ddns.net:3000/api/",
		  "@type": "EntryPoint",
		  "ResourceFacingServiceCatalogue": "http://lesterthomas.ddns.net:3000/api/ResourceFacingServiceCatalogue"
		};
	res.send(JSON.stringify(entryPoint));
	
});

router.get('/vocab', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	var vocab={
			"@context": {
				"vocab": "http://lesterthomas.ddns.net:3000/api/vocab#",
				"hydra": "http://www.w3.org/ns/hydra/core#",
				"ApiDocumentation": "hydra:ApiDocumentation",
				"property": {
					"@id": "hydra:property",
					"@type": "@id"	
				},
			"readonly": "hydra:readonly",
			"writeonly": "hydra:writeonly",
			"supportedClass": "hydra:supportedClass",
			"supportedProperty": "hydra:supportedProperty",
			"supportedOperation": "hydra:supportedOperation",
			"method": "hydra:method",
			"expects": {
				"@id": "hydra:expects",
				"@type": "@id"
			},
			"returns": {
				"@id": "hydra:returns",
				"@type": "@id"
			},
			"statusCodes": "hydra:statusCodes",
			"code": "hydra:statusCode",
			"rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
			"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
			"label": "rdfs:label",
			"description": "rdfs:comment",
			"domain": {
				"@id": "rdfs:domain",
				"@type": "@id"
			},
			"range": {
				"@id": "rdfs:range",
				"@type": "@id"
			},
			"subClassOf": {
				"@id": "rdfs:subClassOf",
				"@type": "@id"
			}
		},
		"@id": "http://lesterthomas.ddns.net:3000/api/vocab",
		"@type": "ApiDocumentation",
		"supportedClass": [
			{
				"@id": "http://www.w3.org/ns/hydra/core#Resource",
				"@type": "hydra:Class",
				"hydra:title": "Resource",
				"hydra:description": null,
				"supportedOperation": [],
				"supportedProperty": []
			},
			{
				"@id": "http://www.w3.org/ns/hydra/core#Collection",
				"@type": "hydra:Class",
				"hydra:title": "Collection",
				"hydra:description": null,
				"supportedOperation": [],
				"supportedProperty": [
					{
						"property": "http://www.w3.org/ns/hydra/core#member",
						"hydra:title": "members",
						"hydra:description": "The members of this collection.",
						"required": null,
						"readonly": false,
						"writeonly": false
					}
				]
			},
			{
				"@id": "http://schema.org/ResourceFacingServiceCatalogue",
				"@type": "hydra:Class",
				"hydra:title": "ResourceFacingServiceCatalogue",
				"hydra:description": null,
				"supportedOperation": [
					{
					"@id": "_:ResourceFacingServiceCatalogue_retrieve",
					"@type": "hydra:Operation",
					"method": "GET",
					"label": "Retrieves a ResourceFacingServiceCatalogue entity",
					"description": null,
					"expects": null,
					"returns": "http://schema.org/ResourceFacingServiceCatalogue",
					"statusCodes": []
					}
				],
				"supportedProperty": [
					{
					"property": "http://schema.org/name",
					"hydra:title": "name",
					"hydra:description": "The ResourceFacingServiceCatalogue's name",
					"required": true,
					"readonly": false,
					"writeonly": false
					},
					{
					"property": "http://schema.org/description",
					"hydra:title": "description",
					"hydra:description": "Description of the ResourceFacingService",
					"required": true,
					"readonly": false,
					"writeonly": false
					}
				]
			},
			{
				"@id": "vocab:EntryPoint",
				"@type": "hydra:Class",
				"subClassOf": null,
				"label": "EntryPoint",
				"description": "The main entry point or homepage of the API.",
				"supportedOperation": [
					{
					"@id": "_:entry_point",
					"@type": "hydra:Operation",
					"method": "GET",
					"label": "The APIs main entry point.",
					"description": null,
					"expects": null,
					"returns": "vocab:EntryPoint",
					"statusCodes": []
					}
				],
				"supportedProperty": [
					{
						"property": {
						"@id": "vocab:EntryPoint/ResourceFacingServiceCatalogue",
						"@type": "hydra:Link",
						"label": "ResourceFacingServiceCatalogue",
						"description": "The ResourceFacingServiceCatalogue collection",
						"domain": "vocab:EntryPoint",
						"range": "vocab:ResourceFacingServiceCatalogueCollection",
						"supportedOperation": [
							{
							"@id": "_:ResourceFacingServiceCatalogue_collection_retrieve",
							"@type": "hydra:Operation",
							"method": "GET",
							"label": "Retrieves all ResourceFacingServiceCatalogue entities",
							"description": null,
							"expects": null,
							"returns": "vocab:ResourceFacingServiceCatalogueCollection",
							"statusCodes": []
							}
						]
					},
					"hydra:title": "ResourceFacingServiceCatalogue",
					"hydra:description": "The ResourceFacingServiceCatalogue collection",
					"required": null,
					"readonly": true,
					"writeonly": false
				}
			]
		},
		{
			"@id": "vocab:ResourceFacingServiceCatalogueCollection",
			"@type": "hydra:Class",
			"subClassOf": "http://www.w3.org/ns/hydra/core#Collection",
			"label": "ResourceFacingServiceCatalogueCollection",
			"description": "A collection of ResourceFacingServiceCatalogues",
			"supportedOperation": [
				{
					"@id": "_:ResourceFacingServiceCatalogue_create",
					"@type": "http://schema.org/AddAction",
					"method": "POST",
					"label": "Creates a new ResourceFacingServiceCatalogue entity",
					"description": null,
					"expects": "http://schema.org/ResourceFacingServiceCatalogue",
					"returns": "http://schema.org/ResourceFacingServiceCatalogue",
					"statusCodes": [
						{
							"code": 201,
							"description": "If the ResourceFacingServiceCatalogue entity was created successfully."
						}
					]
				},
				{
					"@id": "_:ResourceFacingServiceCatalogue_collection_retrieve",
					"@type": "hydra:Operation",
					"method": "GET",
					"label": "Retrieves all ResourceFacingServiceCatalogue entities",
					"description": null,
					"expects": null,
					"returns": "vocab:ResourceFacingServiceCatalogueCollection",
					"statusCodes": []
				}
				],
			"supportedProperty": [
				{
					"property": "http://www.w3.org/ns/hydra/core#member",
					"hydra:title": "members",
					"hydra:description": "The ResourceFacingServiceCatalogue items",
					"required": null,
					"readonly": false,
					"writeonly": false
				}
			]
		}
	]
};




	res.send(JSON.stringify(vocab));
	
});


router.get('/ResourceFacingServiceCatalogue', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	request('http://localhost:5984/acmenetworks/_all_docs?startkey="ResourceFacingServiceCatalogue"&endkey="ResourceFacingServiceCatalogue:99999"&include_docs=true', function (error, response, body) {
		var rfsCatalogueArray=[];
		if (!error && response.statusCode == 200) {
			var rfsCatalogue=JSON.parse(body);
		  	console.log(rfsCatalogue); 
		  	
		  	for(var i=0; i<rfsCatalogue.rows.length; i++) {
		  		var catalogueItem=rfsCatalogue.rows[i].doc;
		  		catalogueItem['@id']='http://lesterthomas.ddns.net:3000/api/' + catalogueItem._id.replace(':','/');
		  		catalogueItem['@type']='ResourceFacingServiceCatalogue';
		  		delete catalogueItem._id;
		  		delete catalogueItem._rev;
		  		delete catalogueItem.description;
		  		rfsCatalogueArray.push(catalogueItem);
		  	}

		  	var outputJsonLd={ "@context":["http://schema.org/",{
				hydra: "http://www.w3.org/ns/hydra/core#",
				vocab: "http://lesterthomas.ddns.net:3000/api/vocab#",
				ResourceFacingServiceCatalogueCollection: "vocab:ResourceFacingServiceCatalogueCollection",
				members: "http://www.w3.org/ns/hydra/core#member"
				}],
				"@type": "ResourceFacingServiceCatalogueCollection",
	  			"@id": "http://lesterthomas.ddns.net:3000/api/ResourceFacingServiceCatalogue/",
	  			members:rfsCatalogueArray
			};
		}
		res.send(JSON.stringify(outputJsonLd));
	})
  
});



router.get('/ResourceFacingServiceCatalogue/:rfsId', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	console.log('Send db request','http://localhost:5984/acmenetworks/ResourceFacingServiceCatalogue:' + req.params.rfsId);
	request('http://localhost:5984/acmenetworks/ResourceFacingServiceCatalogue:' + req.params.rfsId, function (error, response, body) {
	
		if (!error && response.statusCode == 200) {
			var rfsCatalogueItem=JSON.parse(body);
		  	console.log(rfsCatalogueItem); 
		  	rfsCatalogueItem['@id']='http://lesterthomas.ddns.net:3000/api/ResourceFacingServiceCatalogue' + rfsCatalogueItem._id.replace(':','/');
		  	rfsCatalogueItem['@type']='ResourceFacingServiceCatalogue';
		  	delete rfsCatalogueItem._id;
		  	delete rfsCatalogueItem._rev;
	 
		  	var outputJsonContext='http://schema.org/';
			rfsCatalogueItem['@context']=outputJsonContext;
			res.send(JSON.stringify(rfsCatalogueItem));
		}
	
	});

});

router.get('/contexts/EntryPoint.jsonld', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	var context={
		"@context": {
			"hydra": "http://www.w3.org/ns/hydra/core#",
			"vocab": "http://lesterthomas.ddns.net:3000/api/vocab#",
			"EntryPoint": "vocab:EntryPoint",
			"ResourceFacingServiceCatalogue": {
				"@id": "vocab:EntryPoint/ResourceFacingServiceCatalogue",
				"@type": "@id"
			}
		}
	};
	res.send(JSON.stringify(context));

});





module.exports = router;
