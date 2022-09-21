import { Request, Response } from "express";
import ClientsServices from "../../services/clients/clients.service";

class ClientControllers {
  static async createClient(req: Request, res: Response) {
    const { name, email, mobileNumber, registerDate } = req.body;

    const newClient = await ClientsServices.createClientService({
      name,
      email,
      mobileNumber,
      registerDate,
    });

    return res.status(201).json(newClient);
  }

  static async listClients(req: Request, res: Response) {
    const list = await ClientsServices.listClientsService();
    return res.status(200).json(list);
  }
}
export default ClientControllers;
