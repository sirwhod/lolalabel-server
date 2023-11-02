import { LoginEvents } from "@prisma/client";
import { prisma } from "../../database";
import { IAuthRepository } from "../../interfaces/PS/IAuthRepository";

class AuthRepository implements IAuthRepository {
  public async auth(password: string, username: string): Promise<LoginEvents> {
    const eventsList = await prisma.loginEvents.findFirst({
      where: {
        name: username,
        password: password
      }
    })
  
    return eventsList
  }
}

export {
  AuthRepository
}