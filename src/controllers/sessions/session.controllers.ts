import { Request, Response } from "express";
import ClientSessionService from "../../services/sessions/sessions.services";

class ClientSessionController {
  static async createSession(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await ClientSessionService.createSessionService({
      email,
      password,
    });

    return res.status(200).json({ token });
  }
}
export default ClientSessionController;
