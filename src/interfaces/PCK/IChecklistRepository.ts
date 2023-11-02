import { CK_Checklist } from "@prisma/client";

export interface IPCKChecklistRepository {
  create(CLname: string, CLidStore: string): Promise<CK_Checklist>
  active(CLid: string): Promise<CK_Checklist>
  disable(CLid: string): Promise<CK_Checklist>
  findById(CLid: string): Promise<CK_Checklist>
  findActivated(): Promise<CK_Checklist[]>
  findDisabled(): Promise<CK_Checklist[]>
  findAll(): Promise<CK_Checklist[]>
}