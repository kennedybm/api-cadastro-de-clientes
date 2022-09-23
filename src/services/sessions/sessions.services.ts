import AppDataSource from "../../data-source";
import { Clients } from "../../entities/clients.entities";
import { IClientlogin } from "../../interfaces/sessions";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import "dotenv/config";

class ClientSessionService {
  static async createSessionService({ email, password }: IClientlogin) {
    const clientRepository = AppDataSource.getRepository(Clients);

    const client = await clientRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!client) {
      throw new AppError(403, "Email or Password Invalid!");
    }

    const pwdMatch = compare(password, client.password);

    if (!pwdMatch) {
      throw new AppError(403, "Invalid Credentials!");
    }

    const token = jwt.sign(
      {
        id: client.id,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "12h",
      }
    );

    return token;
  }
}
export default ClientSessionService;
