var express = require('express');
var router = express.Router();
var jsonld = require('jsonld');
var request = require('request');



/* GET users listing. */
router.get('/', function(httprequest, httpresponse) {

	//get all the catalogues and build a single array of catalogue data
	var catalogueArray=[];
	var numberOfEndpoints=0;
	//get all the API endpoints
	request('http://localhost:5984/serviceprovider/_all_docs?startkey="IntegrationPoint"&endkey="IntegrationPoint:99999"&include_docs=true', function (error, response, body) {
		
		var integrationPointArray=[];
		if (!error && response.statusCode == 200) {
			var integrationPointCollection=JSON.parse(body);
		  	console.log('integrationPointCollection',integrationPointCollection); 
		  	
		  	for(var i=0; i<integrationPointCollection.rows.length; i++) {
		  		var integrationItem=integrationPointCollection.rows[i].doc;
		  		integrationPointArray.push(integrationItem);
		  	}
		  	numberOfEndpoints=integrationPointArray.length;

			if (numberOfEndpoints==0) { //no data to send
					console.log('Sending empty response', catalogueArray)
					httpresponse.send(catalogueArray);
				}

		  	for(i=0;i<numberOfEndpoints;i++){


			// read the catalogue from URL
			console.log('Loading catalogue',integrationPointArray[i].EntryPoint)
			jsonld.expand(integrationPointArray[i].EntryPoint, function(err, expanded) {
				if (err) {
					console.log('Error',err);
					httpresponse.send(err);
				} else {

					console.log('Loaded expanded API End Point',expanded);
					//get the type of the entry point and append the RFSCatalogue to it

					var type=expanded[0]['@type'][0];
					//calculate Catalogue EndPoint type relative to API End Point type
					var RFSCatalogueEPType=type+'/RFSCatalogue';
					console.log('Catalogue End Point Type is',RFSCatalogueEPType);
					//get the API endpoint of the RFSCatalogue
					var RFSCatalogueEP=expanded[0][RFSCatalogueEPType][0]['@id'];
					console.log('Catalogue End Point is',RFSCatalogueEP);

					//call HTTP GET on the endpoint to get all the catalogue items
					jsonld.expand(RFSCatalogueEP, function (error, expandedRFSCatalogueEP) {
						if (error) {
							httpresponse.send(error);
						} else {
							console.log('Expanded Catalogue',expandedRFSCatalogueEP);
							var membersArray=expandedRFSCatalogueEP[0]['http://www.w3.org/ns/hydra/core#member'];
							for(j=0;j<membersArray.length;j++) {
								catalogueArray.push(membersArray[j]);
							}
							numberOfEndpoints--;
							if (numberOfEndpoints==0) { //we have received data from last endpoint
								console.log('Sending array of endpoints', catalogueArray)
								httpresponse.send(catalogueArray);
							}
						}

					});

					/*
					catalogueArray.push(RFSCatalogueEP);
					numberOfEndpoints--;
					if (numberOfEndpoints==0) { //we have received data from last endpoint
						console.log('Sending array of endpoints', catalogueArray)
						httpresponse.send(catalogueArray);
					}*/
				}
			});
				


		  	}


		} else {
			httpresponse.send('{"error":"'+error+'", "dbResponseStatusCode":"'+response.statusCode+'"');
		}
	});	


	




  
});

module.exports = router;
