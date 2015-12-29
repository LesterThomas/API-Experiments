var express = require('express');
var router = express.Router();
var jsonld_request = require('jsonld-request');
var jsonld = require('jsonld');
var request = require('request');

/* GET integrationPoints from database */
router.get('/', function(httprequest, httpresponse) {

	request('http://localhost:5984/serviceprovider/_all_docs?startkey="IntegrationPoint"&endkey="IntegrationPoint:99999"&include_docs=true', function (error, response, body) {
		
		var integrationPointArray=[];
		if (!error && response.statusCode == 200) {
			var integrationPointCollection=JSON.parse(body);
		  	console.log('integrationPointCollection',integrationPointCollection); 
		  	
		  	for(var i=0; i<integrationPointCollection.rows.length; i++) {
		  		var integrationItem=integrationPointCollection.rows[i].doc;
		  		integrationPointArray.push(integrationItem);
		  	}

		  	
			httpresponse.contentType("application/json");
			httpresponse.send(JSON.stringify(integrationPointArray));
		} else {
			httpresponse.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
	});	
});

/***************************************************************************************
        Create a new integrationPoint item by doing a PUT to the correct id in the database. 
***************************************************************************************/
router.post('/', function(req, res) {
    console.log("POST to integrationPoint" ,req.body);
    console.log("EntryPoint",JSON.stringify(req.body.EntryPoint));
        
	//retrieve the last item from database to work out the next id
	request('http://localhost:5984/serviceprovider/_all_docs?startkey="IntegrationPoint:9999"&endkey="IntegrationPoint"&descending=true&limit=1', function (error, response, body) {

		if (!error && response.statusCode == 200) {
			var id=1;
			if (JSON.parse(body).rows.length>0) {

				var integrationPointItem=JSON.parse(body).rows[0];
			  	console.log('Retrieved last db entry',integrationPointItem); 
				
			  	var id=parseInt(integrationPointItem.id.split(':')[1]);
			  	id++;
			  	
			}

			var newintegrationPointItem={EntryPoint:req.body.EntryPoint};
			console.log('New newintegrationPointItem',newintegrationPointItem);

		  	request({
				   method: 'PUT',
				   uri: 'http://localhost:5984/serviceprovider/IntegrationPoint:' + id,
				   multipart: [{
				       'content-type':'application/json',
				       body: JSON.stringify(newintegrationPointItem) 
					   }]
				}, function(error, request, body){

				var dbResult=JSON.parse(body);
			   	console.log("dbResult",dbResult);

				outId='http://localhost:3002/api/integrationPoint/' +dbResult.id.split(':')[1];
				var outputJSON={"id":outId, EntryPoint: req.body.EntryPoint};

		  		res.contentType("application/json");
				res.send(JSON.stringify(outputJSON));

			});
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
    });
});

/***************************************************************************************
        Delete RFSCatalogue item by doing a DELETE. Get the revision from the existing item first 
***************************************************************************************/
router.delete('/:rfsId', function(req, res) {

	//get the document first as we need the revision number to delete it
	console.log('Send db request','http://localhost:5984/serviceprovider/IntegrationPoint:' + req.params.rfsId );
	request('http://localhost:5984/serviceprovider/IntegrationPoint:' + req.params.rfsId, function (error, response, body) {
	
		if (!error && response.statusCode == 200) {

			var integrationPointItem=JSON.parse(body);
		  	console.log('integrationPointItem', integrationPointItem); 
		  	var dbUrl='http://localhost:5984/serviceprovider/' + integrationPointItem._id + '?rev=' + integrationPointItem._rev;
		  	console.log('dbUrl', dbUrl);
			request({
				   method: 'DELETE',
				   uri: dbUrl
				}, function (error, response, body) {
					console.log('Database delete response', body); 
				});
			res.send('');
		} else {
			res.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"}');
		}
	});
});
  
module.exports = router;
