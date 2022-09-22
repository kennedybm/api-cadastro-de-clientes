import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Clients } from "../../entities/clients.entities";
import { IClientCreate, IClientUpdate } from "../../interfaces/clients";

class ClientsServices {
  static async createClientService({
    name,
    email,
    mobileNumber,
    registerDate,
  }: IClientCreate): Promise<Clients> {
    const clientRepository = AppDataSource.getRepository(Clients);
    const findClient = await clientRepository.find();

    const errors = findClient.map((client) => {
      if (client.name === name) {
        throw new AppError(400, `Name: ${name} already registered!`);
      } else if (client.email == email) {
        throw new AppError(400, `Email: ${email} already registered!`);
      } else if (client.mobileNumber === mobileNumber) {
        throw new AppError(
          400,
          `MobileNumber: ${mobileNumber} already registered!`
        );
      }
    });

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

  //Retrieve by ID
  static async retrieveClientService(id: string): Promise<Clients> {
    const clientRepository = AppDataSource.getRepository(Clients);

    const client = await clientRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!client) {
      throw new AppError(404, "Client not found!");
    }

    return client;
  }

  //Updateb by ID
  static async updateClientService(
    id: string,
    { name, email, mobileNumber }: IClientUpdate
  ): Promise<boolean> {
    const clientRepository = AppDataSource.getRepository(Clients);
    const findClient = await clientRepository.find();

    const client = findClient.find((e) => e.id === id);
    if (!client) {
      throw new AppError(404, "Client not found!");
    }

    const errors = findClient.map((client) => {
      if (client.name === name) {
        throw new AppError(400, `Name: ${name} already in use!`);
      } else if (client.email == email) {
        throw new AppError(400, `Email: ${email} already in use!`);
      } else if (client.mobileNumber === mobileNumber) {
        throw new AppError(
          400,
          `MobileNumber: ${mobileNumber} already in use!`
        );
      }
    });

    name ? (client.name = name) : name;
    email ? (client.email = email) : email;
    mobileNumber ? (client.mobileNumber = mobileNumber) : mobileNumber;

    await clientRepository.update(client.id, client);

    return true;
  }

  //Delete by ID
  static async deleteClientService(id: string): Promise<boolean> {
    const clientRepository = AppDataSource.getRepository(Clients);
    const findClient = await clientRepository.find();

    const client = findClient.find((e) => e.id === id);
    if (!client) {
      throw new AppError(404, "Client not found!");
    }

    await clientRepository.delete(client.id);

    return true;
  }
}
export default ClientsServices;
