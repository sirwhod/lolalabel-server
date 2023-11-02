import { IClientsRepository } from "../../../interfaces/PS/IClientsRepository";

class FindManyClientService {
  constructor(
    private clientsRepository: IClientsRepository
  ){ }

  public async execute(
    nameevent: string
  ){
    const client = await this.clientsRepository.findMany(
      nameevent
    )

    return client;
  }
}

export {
  FindManyClientService
};