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

console.log('Inside rfsCatalogue module');
console.log('Testing constants',constants);

/*******************************************************************
        Get all RFSCatalogue items
*******************************************************************/

router.get('/', function(req, res) {
	console.log('GET /api/RFSCatalogue');
	
	request('http://localhost:5984/acmenetworks/_all_docs?startkey="RFSCatalogue"&endkey="RFSCatalogue:99999"&include_docs=true', function (error, response, body) {
		
		var rfsCatalogueArray=[];
		if (!error && response.statusCode == 200) {
			var rfsCatalogue=JSON.parse(body);
		  	
		  	
		  	for(var i=0; i<rfsCatalogue.rows.length; i++) {
		  		var catalogueItem=rfsCatalogue.rows[i].doc;
		  		if (catalogueItem._id.split(':').length==2) {  //test to check that this is not a feature
			  		catalogueItem['@id']=constants.API_ENTRY_POINT_RFSCATALOGUE + '/' + catalogueItem._id.split(':')[1];
			  		catalogueItem['@type']='http://schema.org/RFSCatalogue';
			  		catalogueItem['features']=constants.API_ENTRY_POINT_RFSCATALOGUE + '/' + catalogueItem._id.split(':')[1] + constants.FEATURES_ROUTE;
			  		delete catalogueItem._id;
			  		delete catalogueItem._rev;
			  		//delete catalogueItem.name;
			  		//delete catalogueItem.description;
			  		//delete catalogueItem.features;
			  		//delete catalogueItem.description; 
			  		rfsCatalogueArray.push(catalogueItem);
			  	}
		  	}

		  	var outputJsonLd={ "@context":["http://schema.org",{
				hydra: "http://www.w3.org/ns/hydra/core#",
				vocab: constants.API_ENTRY_POINT_VOCAB + '#',
				RFSCatalogueCollection: "vocab:RFSCatalogueCollection",
				members: "http://www.w3.org/ns/hydra/core#member",
				features: {
					"@id": "http://schema.org/additionalProperty",
					"@type": "@id"
					}
				}],
				"@type": "RFSCatalogueCollection",
	  			"@id": constants.API_ENTRY_POINT_RFSCATALOGUE,
	  			members:rfsCatalogueArray
			};
			res.contentType("application/ld+json");
			res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
			res.send(JSON.stringify(outputJsonLd));
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
		
	})
	console.log('GET /api/RFSCatalogue complete');
	
  
});

/***************************************************************************************
        Create a new RFSCatalogue item by doing a PUT to the correct id in the database. 
***************************************************************************************/
router.post('/', function(req, res) {
    //res.contentType("application/ld+json");
    console.log("POST to " + constants.API_ENTRY_POINT_RFSCATALOGUE,req.body);
    console.log("name",JSON.stringify(req.body.name));
    console.log("description",JSON.stringify(req.body.description));

    
	//retrieve the last item from database to work out the next id
	request('http://localhost:5984/acmenetworks/_all_docs?startkey="RFSCatalogue:9999"&endkey="RFSCatalogue"&descending=true&limit=1', function (error, response, body) {

		if (!error && response.statusCode == 200) {
			var id=1;
			if (JSON.parse(body).rows.length>0) {

				var rfsCatalogueItem=JSON.parse(body).rows[0];
			  	console.log('Retrieved last db entry',rfsCatalogueItem); 
				
			  	var id=parseInt(rfsCatalogueItem.id.split(':')[1]);
			  	id++;
			  	
			}

			var newResourceCatalogue={name:req.body.name, description:req.body.description };
			console.log('New resource',newResourceCatalogue);

		  	request({
				   method: 'PUT',
				   uri: 'http://localhost:5984/acmenetworks/RFSCatalogue:' + id,
				   multipart: [{
				       'content-type':'application/json',
				       body: JSON.stringify(newResourceCatalogue) 
					   }]
				}, function(error, request, body){

				var dbResult=JSON.parse(body);
			   	console.log("dbResult",dbResult);

				outId=constants.API_ENTRY_POINT_RFSCATALOGUE + '/' +dbResult.id.split(':')[1];
				var outputJSON={"@context":constants.API_ENTRY_POINT_CONTEXT + "/RFSCatalogue.jsonld",
						"@id":outId,
						"@type":"RFSCatalogue"};


		  		res.contentType("application/ld+json");
				res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
				res.send(JSON.stringify(outputJSON));

			});
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
    });
});


/***************************************************************************************
        Get RFSCatalogue item by id. 
***************************************************************************************/
router.get('/:rfsId', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	console.log('Send db request','http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId);
	request('http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId, function (error, response, body) {
	
		if (!error && response.statusCode == 200) {
			var rfsCatalogueItem=JSON.parse(body);
		  	console.log(rfsCatalogueItem); 
		  	rfsCatalogueItem['features']=constants.API_ENTRY_POINT_RFSCATALOGUE + '/' + rfsCatalogueItem._id.split(':')[1] + '/Features'
		  	rfsCatalogueItem['@id']=constants.API_ENTRY_POINT_RFSCATALOGUE + '/' + rfsCatalogueItem._id.split(':')[1];
		  	rfsCatalogueItem['@type']='RFSCatalogue';
		  	delete rfsCatalogueItem._id;
		  	delete rfsCatalogueItem._rev;
	 
			rfsCatalogueItem['@context']=constants.API_ENTRY_POINT_CONTEXT + "/RFSCatalogue.jsonld";
			res.send(JSON.stringify(rfsCatalogueItem));
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
	
	});

});

/***************************************************************************************
        Delete RFSCatalogue item by doing a DELETE. Get the revision from the existing item first 
***************************************************************************************/
router.delete('/:rfsId', function(req, res) {

	//res.contentType("application/ld+json");
	//res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	//get the document first as we need the revision number to delete it
	console.log('Send db request','http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId );
	request('http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId, function (error, response, body) {
	
		if (!error && response.statusCode == 200) {

			var rfsCatalogueItem=JSON.parse(body);
		  	console.log('rfsCatalogueItem', rfsCatalogueItem); 
		  	var dbUrl='http://localhost:5984/acmenetworks/' + rfsCatalogueItem._id + '?rev=' + rfsCatalogueItem._rev;
		  	console.log('dbUrl', dbUrl);
			request({
				   method: 'DELETE',
				   uri: dbUrl
				}, function (error, response, body) {
					console.log('Database delete response', body); 
				});
			res.send('');
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
	});
});


/***************************************************************************************
        Update a RFSCatalogue item by doing a PUT. Get the revision from the existing item first 
***************************************************************************************/
router.put('/:rfsId', function(req, res) {
	console.log("PUT to "+constants.API_ENTRY_POINT_RFSCATALOGUE + "/" + req.params.rfsId,req.body);
    var updatedDocument=req.body;
    delete updatedDocument['@context'];

	res.contentType("application/ld+json");
	res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	//get the document first as we need the revision number to update it
	console.log('Send db request','http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId );
	request('http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId, function (error, response, body) {
	
		if (!error && response.statusCode == 200) {

			var rfsCatalogueItem=JSON.parse(body);
		  	console.log('Existing rfsCatalogueItem', rfsCatalogueItem); 
		  	var dbUrl='http://localhost:5984/acmenetworks/' + rfsCatalogueItem._id + '?rev=' + rfsCatalogueItem._rev;
		  	console.log('dbUrl', dbUrl);
			request({
				   method: 'PUT',
				   uri: dbUrl,
				   multipart: [{
				       'content-type':'application/json',
				       body: JSON.stringify(updatedDocument) 
					   }]
				}, function (error, response, body) {
					console.log('Database PUT response', body); 
					var rfsCatalogueItem=JSON.parse(body);
				  	console.log('rfsCatalogueItem',rfsCatalogueItem); 
				  	rfsCatalogueItem['@id']=constants.API_ENTRY_POINT_RFSCATALOGUE + '/' + rfsCatalogueItem.id.split(':')[1];
				  	rfsCatalogueItem['@type']='RFSCatalogue';
				  	delete rfsCatalogueItem.id;
				  	delete rfsCatalogueItem.rev;
			 
					rfsCatalogueItem['@context']=constants.API_ENTRY_POINT_CONTEXT + "/RFSCatalogue.jsonld";
					res.send(JSON.stringify(rfsCatalogueItem));
				});

		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
	});
});






/***************************************************************************************
        Get RFSCatalogue item Features by id. 
***************************************************************************************/
router.get('/:rfsId/Features', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
	console.log('Inside get Features',req.params.rfsId);

	console.log('Send db request','http://localhost:5984/acmenetworks/_all_docs?startkey="RFSCatalogue:'+req.params.rfsId+':Feature:1"&endkey="RFSCatalogue:'+req.params.rfsId+':Feature:99999"&include_docs=true');
	request('http://localhost:5984/acmenetworks/_all_docs?startkey="RFSCatalogue:'+req.params.rfsId+':Feature:1"&endkey="RFSCatalogue:'+req.params.rfsId+':Feature:99999"&include_docs=true', function (error, response, body) {
	
		
		var featureArray=[];
		if (!error && response.statusCode == 200) {
			var features=JSON.parse(body);
		  	
		  	
		  	for(var i=0; i<features.rows.length; i++) {
		  		var feature=features.rows[i].doc;
		  		feature['@id']=constants.API_ENTRY_POINT_RFSCATALOGUE + '/' + req.params.rfsId + constants.FEATURES_ROUTE + '/' +
		  		 feature._id.split(':')[3];
		  		feature['@type']='http://schema.org/PropertyValue';
		  		delete feature._id;
		  		delete feature._rev;
		  		featureArray.push(feature);
		  	}

		  	var outputJsonLd={ "@context":["http://schema.org",{
				hydra: "http://www.w3.org/ns/hydra/core#",
				vocab: constants.API_ENTRY_POINT_VOCAB + '#',
				FeaturesCollection: "vocab:FeaturesCollection",
				members: "http://www.w3.org/ns/hydra/core#member"
				}],
				"@type": "FeaturesCollection",
	  			"@id": constants.API_ENTRY_POINT_RFSCATALOGUE + '/' + req.params.rfsId + constants.FEATURES_ROUTE,
	  			members:featureArray
			};
			res.contentType("application/ld+json");
			res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
			res.send(JSON.stringify(outputJsonLd));
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
		
	})
});

/***************************************************************************************
        Get individual Feature by id. 
***************************************************************************************/
router.get('/:rfsId/Features/:fId', function(req, res) {
	res.contentType("application/ld+json");
	res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
	console.log('Inside get Features',req.params.rfsId,req.params.fId);

	console.log('Send db request','http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId+ ':Feature:' + req.params.fId);
	request('http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId+ ':Feature:' + req.params.fId, function (error, response, body) {
	
		if (!error && response.statusCode == 200) {
			var feature=JSON.parse(body);
		  	console.log(feature); 
		  	feature['@id']=constants.API_ENTRY_POINT_RFSCATALOGUE + '/' + feature._id.split(':')[1]  + constants.FEATURES_ROUTE + '/' + feature._id.split(':')[3];
		  	feature['@type']='Feature';
		  	delete feature._id;
		  	delete feature._rev;
	 
			feature['@context']=constants.API_ENTRY_POINT_CONTEXT + "/Feature.jsonld";
			res.send(JSON.stringify(feature));
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
	
	});

});



/***************************************************************************************
        Update a Feature by doing a PUT. Get the revision from the existing item first 
***************************************************************************************/
router.put('/:rfsId/Features/:fId', function(req, res) {
	console.log("PUT to "+constants.API_ENTRY_POINT_RFSCATALOGUE + "/" + req.params.rfsId + constants.FEATURES_ROUTE + '/' + req.params.fId, req.body);
    var updatedDocument=req.body;
    delete updatedDocument['@context'];

	res.contentType("application/ld+json");
	res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	//get the document first as we need the revision number to update it
	console.log('Send db request','http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId + ':Feature:' + req.params.fId);
	request('http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId + ':Feature:' + req.params.fId, function (error, response, body) {
	
		if (!error && response.statusCode == 200) {

			var feature=JSON.parse(body);
		  	console.log('Existing rfsCatalogueItem', feature); 
		  	var dbUrl='http://localhost:5984/acmenetworks/' + feature._id + '?rev=' + feature._rev;
		  	console.log('dbUrl', dbUrl);
			request({
				   method: 'PUT',
				   uri: dbUrl,
				   multipart: [{
				       'content-type':'application/json',
				       body: JSON.stringify(updatedDocument) 
					   }]
				}, function (error, response, body) {
					console.log('Database PUT response', body); 
					var feature=JSON.parse(body);
				  	console.log('feature',feature); 
				  	feature['@id']=constants.API_ENTRY_POINT_RFSCATALOGUE + '/' + feature.id.split(':')[1] + constants.FEATURES_ROUTE + '/' + feature.id.split(':')[3];
				  	feature['@type']='Feature';
				  	delete feature.id;
				  	delete feature.rev;
			 
					feature['@context']=constants.API_ENTRY_POINT_CONTEXT + "/Feature.jsonld";
					res.send(JSON.stringify(feature));
				});

		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
	});
});

/***************************************************************************************
        Delete Feature by doing a DELETE. Get the revision from the existing item first 
***************************************************************************************/
router.delete('/:rfsId/Features/:fId', function(req, res) {

	//res.contentType("application/ld+json");
	//res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

	//get the document first as we need the revision number to delete it
	console.log('Send db request','http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId + ':Feature:' + req.params.fId );
	request('http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId + ':Feature:' + req.params.fId, function (error, response, body) {
	
		if (!error && response.statusCode == 200) {

			var feature=JSON.parse(body);
		  	console.log('feature', feature); 
		  	var dbUrl='http://localhost:5984/acmenetworks/' + feature._id + '?rev=' + feature._rev;
		  	console.log('dbUrl', dbUrl);
			request({
				   method: 'DELETE',
				   uri: dbUrl
				}, function (error, response, body) {
					console.log('Database delete response', body); 
				});
			res.send('');
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
	});
});



/***************************************************************************************
        Create a new Feature by doing a PUT to the correct id in the database. 
***************************************************************************************/
router.post('/:rfsId' + constants.FEATURES_ROUTE, function(req, res) {
    //res.contentType("application/ld+json");
    console.log("POST to " + constants.API_ENTRY_POINT_RFSCATALOGUE + req.params.rfsId + constants.FEATURES_ROUTE,req.body);
    console.log("name",JSON.stringify(req.body.name));
    console.log("description",JSON.stringify(req.body.description));

    
	//retrieve the last item from database to work out the next id
	request('http://localhost:5984/acmenetworks/_all_docs?startkey="RFSCatalogue:'+req.params.rfsId+':Feature:9999"&endkey="RFSCatalogue:'+req.params.rfsId+':Feature"&descending=true&limit=1', function (error, response, body) {

		if (!error && response.statusCode == 200) {
			var id=1;
			if (JSON.parse(body).rows.length>0) {

				var feature=JSON.parse(body).rows[0];
			  	console.log('Retrieved last db entry',feature); 
				
			  	var id=parseInt(feature.id.split(':')[3]);
			  	id++;
			  	
			}

			var newFeature={name:req.body.name, description:req.body.description };
			console.log('New resource',newFeature);

		  	request({
				   method: 'PUT',
				   uri: 'http://localhost:5984/acmenetworks/RFSCatalogue:' + req.params.rfsId + ':Feature:' + id,
				   multipart: [{
				       'content-type':'application/json',
				       body: JSON.stringify(newFeature) 
					   }]
				}, function(error, request, body){

				var dbResult=JSON.parse(body);
			   	console.log("dbResult",dbResult);

				outId=constants.API_ENTRY_POINT_RFSCATALOGUE + '/' +dbResult.id.split(':')[1] + constants.FEATURES_ROUTE + '/' + dbResult.id.split(':')[3]  ;
				var outputJSON={
						"name":dbResult.name,
						"description":dbResult.description,
						"@context":constants.API_ENTRY_POINT_CONTEXT + "/Feature.jsonld",
						"@id":outId,
						"@type":"Feature"};


		  		res.contentType("application/ld+json");
				res.setHeader("link",'<'+constants.API_ENTRY_POINT_VOCAB+'>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
				res.send(JSON.stringify(outputJSON));

			});
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
    });
});


module.exports = router;

