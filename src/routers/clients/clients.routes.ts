import { Router } from "express";
import ClientControllers from "../../controllers/clients/clients.controllers";

const routesClients = Router();

//Create client
routesClients.post("", ClientControllers.createClient);
//List all clients
routesClients.get("", ClientControllers.listClients);
//Retrieve by ID
routesClients.get("/:id", ClientControllers.retrieveClient);
//Update by ID
routesClients.patch("/:id", ClientControllers.updateClient);
//Delete by ID
routesClients.delete("/:id", ClientControllers.deleteClient);

export default routesClients;
