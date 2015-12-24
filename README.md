# API Experiments

A series of experiments around APIs. Each experiment folder has its own README. The overall plan is to:

1. Build an API provider based on Resource Facing Services
2. Build a client that is loosely-coupled to this provider. It only binds to the provider at run-time and only via the shared-knowledge of the data schema.
3. Once a RFS Client and API provider are created, I will create a CFS service with its own user interface. This CFS service will be able to orchestrate across multiple RFS providers and will be able to integrate to new RFS providers just by being told the providers API Entry Point.


Progress so far: I have simple client talking to simple server. Load the clients console page.


