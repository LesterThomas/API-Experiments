# Acme Networks

This is a test provider of Resource Facing Services. It uses nodejs/express to expose API's. It sits on top of a CouchDb database at http://localhost:5984/acmenetworks 

So far, I have implememted

1. EntryPoint API that lists the available APIs http://acmenetworks.com:3000/api/ 
2. The Resource Facing Services Catalogue API that exposes the Collection of all Resource Facing Services http://acmenetworks.com:3000/api/ResourceFacingServiceCatalogue
3. The querying of a single Resource Facing Services Catalogue item by id http://acmenetworks.com:3000/api/ResourceFacingServiceCatalogue/1

To be implemented

1. Collection and individual API's for Resource Facing Service Inventory
2. Ordering API to create a new Inventory item for a given Catalogue item

## Build & development

Run `grunt` to run the API service.


