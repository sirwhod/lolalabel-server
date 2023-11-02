import { CK_Task } from "@prisma/client";

export interface CreateTask {
  TKname: string, 
  TKdescription: string 
}

export interface IPCKTaskRepository {
  create(
    TKidChecklist: string, 
    TKname: string, 
    TKdescription: string 
  ): Promise<CK_Task>
  modifyName(
    TKid: string, 
    TKname: string
  ): Promise<CK_Task>
  modifyDescription(
    TKid: string, 
    TKdescription: string
  ): Promise<CK_Task>
  active(TKid: string): Promise<CK_Task>
  disable(TKid: string): Promise<CK_Task>
  findById(TKid: string): Promise<CK_Task>
  findByIdChecklist(TKidChecklist: string): Promise<CK_Task[]>
  findActivated(): Promise<CK_Task[]>
  findDisabled(): Promise<CK_Task[]>
  findAll(): Promise<CK_Task[]>
}