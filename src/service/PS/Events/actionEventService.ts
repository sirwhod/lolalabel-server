import { IEventsRepository } from "../../../interfaces/PS/IEventsRepository";


class ActionEventService {
  constructor(
    private eventsRepository: IEventsRepository
  ){ }

  public async execute(
    idEvent: string
  ){
    const event = await this.eventsRepository.action(idEvent)

    return event;
  }
}

export {
  ActionEventService
};