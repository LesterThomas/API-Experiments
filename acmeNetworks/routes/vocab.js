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

router.get('/', function(req, res) {
	console.log('GET /api/vocab');
	
	var vocab={
			"@context": {
				"vocab": constants.API_ENTRY_POINT_VOCAB + "#",
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
		"@id": constants.API_ENTRY_POINT_VOCAB,
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
					},
					{
					"@id": "_:RFSCatalogue_delete",
					"@type": "http://schema.org/DeleteAction",
					"method": "DELETE",
					"label": "Deletes a Resource Facing Service Catalogue entity",
					"description": null,
					"expects": null,
					"returns": "http://www.w3.org/2002/07/owl#Nothing",
					"statusCodes": []
					},
					{
					"@id": "_:RFSCatalogue_replace",
					"@type": "http://schema.org/UpdateAction",
					"method": "PUT",
					"label": "Replaces an existing Resource Facing Service Catalogue entity",
					"description": null,
					"expects": "http://schema.org/RFSCatalogue",
					"returns": "http://schema.org/RFSCatalogue",
					"statusCodes": [
						{
						"code": 404,
						"description": "If the RFSCatalogue entity wasn't found."
						}
					]
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
					},
					//**************************************************************************************************************
					//  Define the link to the Features Collection *****************************************************************
					//**************************************************************************************************************
					{ 
						"property": {
							"@id": "vocab:EntryPoint/RFSCatalogue/Features", 
							"@type": "hydra:Link",
							"label": "Features",
							"description": "The Features collection",
							"domain": "vocab:EntryPoint/RFSCatalogue",
							"range": "vocab:FeaturesCollection",
							"supportedOperation": [
								{
								"@id": "_:Features_collection_retrieve",
								"@type": "hydra:Operation",
								"method": "GET",
								"label": "Retrieves all Features for this RFSCatalogue item",
								"description": null,
								"expects": null,
								"returns": "vocab:FeaturesCollection",
								"statusCodes": []
								}
							]
						},
					"hydra:title": "Features",
					"hydra:description": "The Features collection",
					"required": null,
					"readonly": true,
					"writeonly": false
				}




				]
			},
			{
				"@id": "http://schema.org/PropertyValue",
				"@type": "hydra:Class",
				"hydra:title": "Feature",
				"hydra:description": null,
				"supportedOperation": [
					{
					"@id": "_:Feature_retrieve",
					"@type": "hydra:Operation",
					"method": "GET",
					"label": "Retrieves a Feature",
					"description": null,
					"expects": null,
					"returns": "http://schema.org/PropertyValue",
					"statusCodes": []
					},
					{
					"@id": "_:Feature_delete",
					"@type": "http://schema.org/DeleteAction",
					"method": "DELETE",
					"label": "Deletes a Feature",
					"description": null,
					"expects": null,
					"returns": "http://www.w3.org/2002/07/owl#Nothing",
					"statusCodes": []
					},
					{
					"@id": "_:Feature_replace",
					"@type": "http://schema.org/UpdateAction",
					"method": "PUT",
					"label": "Replaces an existing Feature",
					"description": null,
					"expects": "http://schema.org/PropertyValue",
					"returns": "http://schema.org/PropertyValue",
					"statusCodes": [
						{
						"code": 404,
						"description": "If the Feature entity wasn't found."
						}
					]
					}

				],
				"supportedProperty": [
					{
					"property": "http://schema.org/name",
					"hydra:title": "name",
					"hydra:description": "The Feature's name",
					"required": true,
					"readonly": false,
					"writeonly": false
					},
					{
					"property": "http://schema.org/description",
					"hydra:title": "description",
					"hydra:description": "Description of the Feature",
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
		},
		//**************************************************************************************************************
		//  Define the Features Collection *****************************************************************
		//**************************************************************************************************************
		{
			"@id": "vocab:FeaturesCollection",
			"@type": "hydra:Class",
			"subClassOf": "http://www.w3.org/ns/hydra/core#Collection",
			"label": "FeaturesCollection",
			"description": "A collection of Features",
			"supportedOperation": [
				{
					"@id": "_:Features_create",
					"@type": "http://schema.org/AddAction",
					"method": "POST",
					"label": "Creates a new Feature",
					"description": null,
					"expects": "http://schema.org/PropertyValue",
					"returns": "http://schema.org/PropertyValue",
					"statusCodes": [
						{
							"code": 201,
							"description": "If the Feature was created successfully."
						}
					]
				},
				{
					"@id": "_:Features_collection_retrieve",
					"@type": "hydra:Operation",
					"method": "GET",
					"label": "Retrieves all Features for this RFSCatalogue item",
					"description": null,
					"expects": null,
					"returns": "vocab:FeaturesCollection",
					"statusCodes": []
				}
				],
			"supportedProperty": [
				{
					"property": "http://www.w3.org/ns/hydra/core#member",
					"hydra:title": "members",
					"hydra:description": "The Features",
					"required": null,
					"readonly": false,
					"writeonly": false
				}
			]
		}
	]
};




	res.contentType("application/ld+json");
	res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
	res.send(JSON.stringify(vocab));
	console.log('GET /api/vocab complete');
	
});


module.exports = router;
