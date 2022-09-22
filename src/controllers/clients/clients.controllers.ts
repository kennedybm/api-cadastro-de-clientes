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

  static async retrieveClient(req: Request, res: Response) {
    const { id } = req.params;

    const client = await ClientsServices.retrieveClientService(id);

    return res.status(200).json(client);
  }

  static async updateClient(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, mobileNumber } = req.body;

    const updated = await ClientsServices.updateClientService(id, {
      name,
      email,
      mobileNumber,
    });

    return res.status(200).json({
      message: "Updated with success!",
    });
  }

  static async deleteClient(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await ClientsServices.deleteClientService(id);

    return res.status(200).json({
      message: "Deleted with success!",
    });
  }
}
export default ClientControllers;
