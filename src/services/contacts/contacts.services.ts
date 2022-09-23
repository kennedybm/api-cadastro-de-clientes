import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Contacts } from "../../entities/contacts.entities";
import { Clients } from "../../entities/clients.entities";
import {
  IContactCreate,
  IContactUpdate,
} from "../../interfaces/contacts/index";

class ContactServices {
  static async createContactService(
    id: string,
    userId: string,
    { name, email, mobileNumber }: IContactCreate
  ) {
    const contactRepository = AppDataSource.getRepository(Contacts);
    const findContact = await contactRepository.find();

    const clientRepository = AppDataSource.getRepository(Clients);
    const client = await clientRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!client) {
      throw new AppError(404, "Client not found!");
    }

    findContact.map((contact) => {
      if (contact.email == email) {
        throw new AppError(400, `Email: ${email} already registered!`);
      } else if (contact.mobileNumber === mobileNumber) {
        throw new AppError(
          400,
          `MobileNumber: ${mobileNumber} already registered!`
        );
      }
    });

    if (id != userId) {
      throw new AppError(403, "Unauthorized!");
    }

    const contact = contactRepository.create({
      name,
      email,
      mobileNumber,
    });

    contact.client = client;

    await contactRepository.save(contact);

    const contactResponse = {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      mobileNumber: contact.mobileNumber,
    };

    return contactResponse;
  }

  //List all
  static async listContactsService(): Promise<Contacts[]> {
    const contactRepository = AppDataSource.getRepository(Contacts);
    const contactsList = contactRepository.find();

    return contactsList;
  }

  //Retrieve by ID
  static async retrieveContactService(id: string) {
    const contactRepository = AppDataSource.getRepository(Contacts);

    const contact = await contactRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!contact) {
      throw new AppError(404, "Contact not found!");
    }

    const join = await contactRepository
      .createQueryBuilder("contact")
      .where("contact.id = :id", { id: id })
      .leftJoinAndSelect("contact.client", "client")
      .getOne();

    let contactResponse = {};

    if (join?.client != null) {
      contactResponse = {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        mobileNumber: contact.mobileNumber,
        client: {
          id: join?.client.id,
          name: join?.client.name,
          email: join?.client.email,
          mobileNumber: join?.mobileNumber,
          registerDate: join?.client.registerDate,
        },
      };
    }

    return contactResponse;
  }

  //Update by ID
  static async updateContactService(
    id: string,
    { name, email, mobileNumber }: IContactUpdate
  ): Promise<boolean> {
    const contactRepository = AppDataSource.getRepository(Contacts);
    const findContact = await contactRepository.find();

    const contact = findContact.find((e) => e.id === id);
    if (!contact) {
      throw new AppError(404, "Contact not found!");
    }

    findContact.map((contact) => {
      if (contact.name === name) {
        throw new AppError(400, `Name: ${name}, already in use!`);
      } else if (contact.email == email) {
        throw new AppError(400, `Email: ${email}, already in use!`);
      } else if (contact.mobileNumber === mobileNumber) {
        throw new AppError(
          400,
          `MobileNumber: ${mobileNumber}, already in use!`
        );
      }
    });

    name
      ? await contactRepository
          .createQueryBuilder()
          .update(Contacts)
          .set({ name: name })
          .where("id = :id", { id: id })
          .execute()
      : name;
    email
      ? await contactRepository
          .createQueryBuilder()
          .update(Contacts)
          .set({ email: email })
          .where("id = :id", { id: id })
          .execute()
      : email;
    mobileNumber
      ? await contactRepository
          .createQueryBuilder()
          .update(Contacts)
          .set({ mobileNumber: mobileNumber })
          .where("id = :id", { id: id })
          .execute()
      : mobileNumber;

    return true;
  }

  //Delete by ID
  static async deleteContactService(id: string): Promise<boolean> {
    const contactRepository = AppDataSource.getRepository(Contacts);
    const contact = await contactRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!contact) {
      throw new AppError(404, "Client not found!");
    }

    await contactRepository.delete(contact.id);

    return true;
  }
}
export default ContactServices;
