import { IEventsRepository } from "../../../interfaces/PS/IEventsRepository";


class CreateEventService {
  constructor(
    private eventsRepository: IEventsRepository
  ){ }

  public async execute(
    name: string,
    password: string,
    activeData: Date,
    active: boolean
  ){
    const event = await this.eventsRepository.create(
      name, 
      password, 
      activeData, 
      active
    )

    return event;
  }
}

export {
  CreateEventService
};