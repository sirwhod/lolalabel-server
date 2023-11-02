import { IEventsRepository } from "../../../interfaces/PS/IEventsRepository";


class FindEventService {
  constructor(
    private eventsRepository: IEventsRepository
  ){ }

  public async execute(
    nameevent: string
  ){
    const event = await this.eventsRepository.find(nameevent)

    return event;
  }
}

export {
  FindEventService
};