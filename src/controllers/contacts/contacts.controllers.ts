import { Request, Response } from "express";
import ContactServices from "../../services/contacts/contacts.services";

class ContactControllers {
  static async createContact(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.user;
    const { name, email, mobileNumber } = req.body;

    const newContact = await ContactServices.createContactService(id, userId, {
      name,
      email,
      mobileNumber,
    });

    return res.status(201).json(newContact);
  }

  static async listContacts(req: Request, res: Response) {
    const list = await ContactServices.listContactsService();
    return res.status(200).json(list);
  }

  static async retrieveContact(req: Request, res: Response) {
    const { id } = req.params;
    const contact = await ContactServices.retrieveContactService(id);

    return res.status(200).json(contact);
  }

  static async updateContact(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, mobileNumber } = req.body;

    const updated = await ContactServices.updateContactService(id, {
      name,
      email,
      mobileNumber,
    });

    return res.status(200).json({ message: "Updated with success!" });
  }

  static async deleteContact(req: Request, res: Response) {
    const { id } = req.params;
    const updated = await ContactServices.deleteContactService(id);

    return res.status(200).json({ message: "Deleted with success!" });
  }
}
export default ContactControllers;
