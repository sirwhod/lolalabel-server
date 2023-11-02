import { Log } from '@prisma/client';



export interface IHistoryRepository {
  create( 
    action: string,
    productOrInstruction: boolean,
    itemName: string,
    agent: string
    ): Promise<Log>;
}