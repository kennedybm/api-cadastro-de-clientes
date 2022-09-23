import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import routesClients from "./routers/clients/clients.routes";
import routesContacts from "./routers/contacts/contacts.routes";
import routesSessions from "./routers/sessions/sessions.routes";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middlewares";

const app = express();
app.use(express.json());

app.use("/login", routesSessions);
app.use("/clients", routesClients);
app.use("/contacts", routesContacts);
app.use(handleAppErrorMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log("App runing");
});
export default app;
