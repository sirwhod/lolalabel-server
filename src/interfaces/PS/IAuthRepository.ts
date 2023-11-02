import { LoginEvents } from "@prisma/client";

export interface IAuthRepository {
  auth(password: string, username: string): Promise<LoginEvents>
}