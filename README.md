# API Experiments

A series of experiments around APIs, testing next-generation API's based on Hyper-media, linked-data (JSON-LD), Hydra and the semantic web.

Each experiment folder has its own README. The subfolders contain

1. ACME Networks and vNetworks are API Providers that both offer an API around Resource Facing Services (RFSCatalogue). The APIs are not identical, but both comform to the JSON-LD and Hydra design patterns and follow http://schema.org data models. You can test each of these API's separately using the Hydra Console at http://www.markus-lanthaler.com/hydra/console/

2. ServiceProvider is a separate application that can integrate to any API that conforms to JSON_LD, Hydra and offers a RFSCatalogue API. The application is a headless app that requires a separate UI in point 3. below.

3. Console is a Angular UI on top of Service Provider that allows you to add integration Entry Points and then browse the federated RFSCatalogue.  



A screenshot of the console:
![Console](/screenshot.bmp?raw=true "Console")