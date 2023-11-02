import { IEventsRepository } from "../../../interfaces/PS/IEventsRepository";


class DrawPrizeEventService {
  constructor(
    private eventsRepository: IEventsRepository
  ){ }

  public async execute(
    id: string, 
    name: string, 
    phone: string, 
    email: string
  ){
    const event = await this.eventsRepository.drawprize(
      id,
      name,
      phone,
      email
    )

    return event;
  }
}

export {
  DrawPrizeEventService
};