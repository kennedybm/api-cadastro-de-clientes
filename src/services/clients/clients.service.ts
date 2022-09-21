import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Clients } from "../../entities/clients.entities";
import { IClientCreate } from "../../interfaces/clients";

class ClientsServices {
  static async createClientService({
    name,
    email,
    mobileNumber,
    registerDate,
  }: IClientCreate): Promise<Clients> {
    const clientRepository = AppDataSource.getRepository(Clients);

    const findClient = await clientRepository.findOne({
      where: {
        email: email,
      },
    });

    if (findClient) {
      throw new AppError(400, "Client already registered!");
    }

    const client = clientRepository.create({
      name,
      email,
      mobileNumber,
      registerDate,
    });
    await clientRepository.save(client);

    return client;
  }

  //List all
  static async listClientsService(): Promise<Clients[]> {
    const clientsRepository = AppDataSource.getRepository(Clients);
    const clientsList = await clientsRepository.find();

    return clientsList;
  }
}
export default ClientsServices;
