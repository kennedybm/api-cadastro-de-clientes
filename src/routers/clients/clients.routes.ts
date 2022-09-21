import { Router } from "express";
import ClientControllers from "../../controllers/clients/clients.controllers";

const routesClients = Router();

//Create client
routesClients.post("", ClientControllers.createClient);
//List all clients
routesClients.get("", ClientControllers.listClients);

export default routesClients;
