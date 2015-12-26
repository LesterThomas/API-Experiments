var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
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
				"@id": "http://schema.org/RFSCatalogue",
				"@type": "hydra:Class",
				"hydra:title": "RFSCatalogue",
				"hydra:description": null,
				"supportedOperation": [
					{
					"@id": "_:RFSCatalogue_retrieve",
					"@type": "hydra:Operation",
					"method": "GET",
					"label": "Retrieves a Resource Facing Service Catalogue entity",
					"description": null,
					"expects": null,
					"returns": "http://schema.org/RFSCatalogue",
					"statusCodes": []
					}
				],
				"supportedProperty": [
					{
					"property": "http://schema.org/name",
					"hydra:title": "name",
					"hydra:description": "The Resource Facing Service Catalogue item's name",
					"required": true,
					"readonly": false,
					"writeonly": false
					},
					{
					"property": "http://schema.org/description",
					"hydra:title": "description",
					"hydra:description": "Description of the Resource Facing Service",
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
						"@id": "vocab:EntryPoint/RFSCatalogue",
						"@type": "hydra:Link",
						"label": "RFSCatalogue",
						"description": "The Resource Facing Service Catalogue collection",
						"domain": "vocab:EntryPoint",
						"range": "vocab:RFSCatalogueCollection",
						"supportedOperation": [
							{
							"@id": "_:RFSCatalogue_collection_retrieve",
							"@type": "hydra:Operation",
							"method": "GET",
							"label": "Retrieves all Resource Facing Service Catalogue entities",
							"description": null,
							"expects": null,
							"returns": "vocab:RFSCatalogueCollection",
							"statusCodes": []
							}
						]
					},
					"hydra:title": "RFSCatalogue",
					"hydra:description": "The Resource Facing Service Catalogue collection",
					"required": null,
					"readonly": true,
					"writeonly": false
				}
			]
		},
		{
			"@id": "vocab:RFSCatalogueCollection",
			"@type": "hydra:Class",
			"subClassOf": "http://www.w3.org/ns/hydra/core#Collection",
			"label": "RFSCatalogueCollection",
			"description": "A collection of Resource Facing Service Catalogue items",
			"supportedOperation": [
				{
					"@id": "_:RFSCatalogue_create",
					"@type": "http://schema.org/AddAction",
					"method": "POST",
					"label": "Creates a new Resource Facing Service Catalogue entity",
					"description": null,
					"expects": "http://schema.org/RFSCatalogue",
					"returns": "http://schema.org/RFSCatalogue",
					"statusCodes": [
						{
							"code": 201,
							"description": "If the Resource Facing Service Catalogue entity was created successfully."
						}
					]
				},
				{
					"@id": "_:RFSCatalogue_collection_retrieve",
					"@type": "hydra:Operation",
					"method": "GET",
					"label": "Retrieves all Resource Facing Service Catalogue entities",
					"description": null,
					"expects": null,
					"returns": "vocab:RFSCatalogueCollection",
					"statusCodes": []
				}
				],
			"supportedProperty": [
				{
					"property": "http://www.w3.org/ns/hydra/core#member",
					"hydra:title": "members",
					"hydra:description": "The Resource Facing Service Catalogue items",
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


module.exports = router;
