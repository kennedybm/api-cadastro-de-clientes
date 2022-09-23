import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Clients } from "../../entities/clients.entities";
import { IClientCreate, IClientUpdate } from "../../interfaces/clients";
import { hash } from "bcryptjs";

class ClientsServices {
  static async createClientService({
    name,
    email,
    password,
    mobileNumber,
    registerDate,
  }: IClientCreate): Promise<Clients[]> {
    const clientRepository = AppDataSource.getRepository(Clients);
    const findClient = await clientRepository.find();

    findClient.map((client) => {
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

    const hashedPassword = await hash(password, 10);

    const client = clientRepository.create({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
      registerDate,
    });

    await clientRepository.save(client);

    const clientResponse = await clientRepository
      .createQueryBuilder("client")
      .where("client.email = :email", { email: email })
      .select("client.id")
      .addSelect("client.name")
      .addSelect("client.email")
      .addSelect("client.mobileNumber")
      .addSelect("client.registerDate")
      .getMany();

    return clientResponse;
  }

  //List all
  static async listClientsService(): Promise<Clients[]> {
    const clientRepository = AppDataSource.getRepository(Clients);

    const clientResponse = await clientRepository
      .createQueryBuilder("client")
      .select("client.id")
      .addSelect("client.name")
      .addSelect("client.email")
      .addSelect("client.mobileNumber")
      .addSelect("client.registerDate")
      .getMany();

    return clientResponse;
  }

  //Retrieve by ID
  static async retrieveClientService(id: string): Promise<Clients[]> {
    const clientRepository = AppDataSource.getRepository(Clients);

    const client = await clientRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!client) {
      throw new AppError(404, "Client not found!");
    }

    const clientResponse = await clientRepository
      .createQueryBuilder("client")
      .where("client.id = :id", { id: id })
      .select("client.id")
      .addSelect("client.name")
      .addSelect("client.email")
      .addSelect("client.mobileNumber")
      .addSelect("client.registerDate")
      .leftJoinAndSelect("client.contacts", "contacts")
      .getMany();

    return clientResponse;
  }

  //Update by ID
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

    findClient.map((client) => {
      if (client.name === name) {
        throw new AppError(400, `Name: ${name}, already in use!`);
      } else if (client.email == email) {
        throw new AppError(400, `Email: ${email}, already in use!`);
      } else if (client.mobileNumber === mobileNumber) {
        throw new AppError(
          400,
          `MobileNumber: ${mobileNumber}, already in use!`
        );
      }
    });

    name
      ? await clientRepository
          .createQueryBuilder()
          .update(Clients)
          .set({ name: name })
          .where("id = :id", { id: id })
          .execute()
      : name;
    email
      ? await clientRepository
          .createQueryBuilder()
          .update(Clients)
          .set({ email: email })
          .where("id = :id", { id: id })
          .execute()
      : email;
    mobileNumber
      ? await clientRepository
          .createQueryBuilder()
          .update(Clients)
          .set({ mobileNumber: mobileNumber })
          .where("id = :id", { id: id })
          .execute()
      : mobileNumber;

    return true;
  }

  //Delete by ID
  static async deleteClientService(id: string): Promise<boolean> {
    const clientRepository = AppDataSource.getRepository(Clients);
    const client = await clientRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!client) {
      throw new AppError(404, "Client not found!");
    }

    await clientRepository.delete(client.id);

    return true;
  }
}
export default ClientsServices;
