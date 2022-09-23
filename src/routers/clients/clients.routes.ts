import { Router } from "express";
import ClientControllers from "../../controllers/clients/clients.controllers";
import authorizationMiddleware from "../../middlewares/authorization.middlewares";

const routesClients = Router();

//Create client
routesClients.post("", ClientControllers.createClient);
//List all clients
routesClients.get("", authorizationMiddleware, ClientControllers.listClients);
//Retrieve by ID
routesClients.get(
  "/:id",
  authorizationMiddleware,
  ClientControllers.retrieveClient
);
//Update by ID
routesClients.patch(
  "/:id",
  authorizationMiddleware,
  ClientControllers.updateClient
);
//Delete by ID
routesClients.delete(
  "/:id",
  authorizationMiddleware,
  ClientControllers.deleteClient
);

export default routesClients;
