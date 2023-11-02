import { CK_ChecklistFilled, CK_ChecklistFinished, CK_ChecklistStarted, CK_Fill } from "@prisma/client";

export interface IPCKChecklistFilledRepository {
  createCFL(
    CFLidChecklist: string
  ): Promise<CK_ChecklistFilled>
  startCFL(
    CSidChecklistFilled: string,
    CSidUserStarted: string
  ): Promise<CK_ChecklistStarted>
  finishCFL(
    CFidChecklistFilled: string,
    CFidUserFinished: string
  ): Promise<CK_ChecklistFinished>
  findByIdCFL(
    CFLid: string
  ): Promise<CK_ChecklistFilled>
  findStartedCFL(): Promise<CK_ChecklistFilled[]>
  findFinishedCFL(): Promise<CK_ChecklistFilled[]>
  findAllCFL(): Promise<CK_ChecklistFilled[]>

  createFL(
    FLidTask: string, 
    FLidUser: string, 
    FLidChecklistFilled: string
  ): Promise<CK_Fill>
  modifyFL(
    FLid: string, 
    FLresponse: string, 
    FLcomment: string, 
    FLidUser: string 
  ): Promise<CK_Fill>
  findByIdFL(
    FLid: string
  ): Promise<CK_Fill>
  findByIdFLtoCFL(
    FLidChecklistFilled: string
  ): Promise<CK_Fill[]>
  findAllFL(): Promise<CK_Fill[]>

}