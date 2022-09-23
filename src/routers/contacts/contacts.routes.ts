import { Router } from "express";
import ContactControllers from "../../controllers/contacts/contacts.controllers";
import authorizationMiddleware from "../../middlewares/authorization.middlewares";

const routesContacts = Router();

//Create contact
routesContacts.post(
  "/:id",
  authorizationMiddleware,
  ContactControllers.createContact
);
//List all
routesContacts.get(
  "",
  authorizationMiddleware,
  ContactControllers.listContacts
);
//Retrieve by ID
routesContacts.get(
  "/:id",
  authorizationMiddleware,
  ContactControllers.retrieveContact
);
//Update by ID
routesContacts.patch(
  "/:id",
  authorizationMiddleware,
  ContactControllers.updateContact
);
//Delete by ID
routesContacts.delete(
  "/:id",
  authorizationMiddleware,
  ContactControllers.deleteContact
);

export default routesContacts;
