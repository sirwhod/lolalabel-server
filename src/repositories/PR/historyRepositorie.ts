import { Log } from '@prisma/client';
import { prisma } from '../../database';
import { getDateBrazil } from '../../utils/getDataBrazil';
import { IHistoryRepository } from '../../interfaces/PR/IHistoryRepository';

class HistoryRepositorie implements IHistoryRepository {

  public async create(
    action: string,
    productOrInstruction: boolean,
    itemName: string,
    agent: string
    )
    : Promise<Log> {
      const date = getDateBrazil()

      const history = await prisma.log.create({
        data: {
          action: action,
          productOrInstruction: productOrInstruction,
          itemName: itemName,
          agent: {
            connect: {
              id: agent
            }
          },
          creationDate: date
        },
        include: {
          agent: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })

      return history
  }
}

export {
  HistoryRepositorie
};