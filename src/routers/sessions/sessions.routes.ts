import { Router } from "express";
import ClientSessionController from "../../controllers/sessions/session.controllers";

const routesSessions = Router();

//Create Client Session
routesSessions.post("", ClientSessionController.createSession);

export default routesSessions;
