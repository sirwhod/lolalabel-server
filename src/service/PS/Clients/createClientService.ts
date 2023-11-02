import { IClientsRepository } from "../../../interfaces/PS/IClientsRepository";

class CreateClientService {
  constructor(
    private clientsRepository: IClientsRepository
  ){ }

  public async execute(
    name: string, 
    email: string, 
    event: string, 
    news: boolean, 
    phone: string
  ){
    const client = await this.clientsRepository.create(
      name,
      email,
      event,
      news,
      phone
    )

    return client;
  }
}

export {
  CreateClientService
};