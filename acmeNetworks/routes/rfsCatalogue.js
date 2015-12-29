var express = require('express');
var router = express.Router();
var request = require('request');

/*******************************************************************
        Get all RFSCatalogue items
*******************************************************************/

router.get('/', function(req, res) {
	
	request('http://localhost:5984/acmenetworks/_all_docs?startkey="RFSCatalogue"&endkey="RFSCatalogue:99999"&include_docs=true', function (error, response, body) {
		
		var rfsCatalogueArray=[];
		if (!error && response.statusCode == 200) {
			var rfsCatalogue=JSON.parse(body);
		  	console.log(rfsCatalogue); 
		  	
		  	for(var i=0; i<rfsCatalogue.rows.length; i++) {
		  		var catalogueItem=rfsCatalogue.rows[i].doc;
		  		catalogueItem['@id']='http://lesterthomas.ddns.net:3000/api/' + catalogueItem._id.replace(':','/');
		  		catalogueItem['@type']='http://schema.org/RFSCatalogue';
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
			res.contentType("application/ld+json");
			res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
			res.send(JSON.stringify(outputJsonLd));
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
		
	})
  
});

/***************************************************************************************
        Create a new RFSCatalogue item by doing a PUT to the correct id in the database. 
***************************************************************************************/
router.post('/', function(req, res) {
    //res.contentType("application/ld+json");
    console.log("POST to http://lesterthomas.ddns.net:3000/api/RFSCatalogue",req.body);
    console.log("name",JSON.stringify(req.body.name));
    console.log("description",JSON.stringify(req.body.description));

    
	//retrieve the last item from database to work out the next id
	request('http://localhost:5984/acmenetworks/_all_docs?startkey="RFSCatalogue:9999"&endkey="RFSCatalogue"&descending=true&limit=1', function (error, response, body) {

		if (!error && response.statusCode == 200) {
			var rfsCatalogueItem=JSON.parse(body).rows[0];
		  	console.log('Retrieved last db entry',rfsCatalogueItem); 
			
		  	var id=parseInt(rfsCatalogueItem.id.split(':')[1]);
		  	id++;
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

				outId="http://lesterthomas.ddns.net:3000/api/RFSCatalogue/"+dbResult.id.split(':')[1];
				var outputJSON={"@context":"http://lesterthomas.ddns.net:3000/api/contexts/RFSCatalogue.jsonld",
						"@id":outId,
						"@type":"RFSCatalogue"};

		  		delete rfsCatalogueItem.ok;
		  		delete rfsCatalogueItem.rev;

		  		res.contentType("application/ld+json");
				res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
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
	 
			rfsCatalogueItem['@context']="http://lesterthomas.ddns.net:3000/api/contexts/RFSCatalogue.jsonld";
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
	//res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

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
	console.log("PUT to http://lesterthomas.ddns.net:3000/api/RFSCatalogue/" + req.params.rfsId,req.body);
    var updatedDocument=req.body;

	res.contentType("application/ld+json");
	res.setHeader("link",'<http://lesterthomas.ddns.net:3000/api/vocab>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');

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
					console.log('Database delete response', body); 
					var rfsCatalogueItem=JSON.parse(body);
				  	console.log('rfsCatalogueItem',rfsCatalogueItem); 
				  	rfsCatalogueItem['@id']='http://lesterthomas.ddns.net:3000/api/' + rfsCatalogueItem.id.replace(':','/');
				  	rfsCatalogueItem['@type']='RFSCatalogue';
				  	delete rfsCatalogueItem.id;
				  	delete rfsCatalogueItem.rev;
			 
					rfsCatalogueItem['@context']="http://lesterthomas.ddns.net:3000/api/contexts/RFSCatalogue.jsonld";
					res.send(JSON.stringify(rfsCatalogueItem));
				});

		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
	});
});


module.exports = router;
