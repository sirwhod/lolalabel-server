import { IEventsRepository } from "../../../interfaces/PS/IEventsRepository";


class FindManyEventService {
  constructor(
    private eventsRepository: IEventsRepository
  ){ }

  public async execute(){
    const event = await this.eventsRepository.findMany()

    return event;
  }
}

export {
  FindManyEventService
};