
import { CK_Checklist } from "@prisma/client";
import { prisma } from "../../database";
import { IPCKChecklistRepository } from "../../interfaces/PCK/IChecklistRepository";

class PCKChecklistRepository implements IPCKChecklistRepository {
  public async create(CLname: string, CLidStore: string): Promise<CK_Checklist> {
    const checklist = await prisma.cK_Checklist.create({
      data: {
        CLname,
        CLidStore,
        CLstatus: true
      }
    })

    return checklist
  }
  public async active(CLid: string): Promise<CK_Checklist> {
    const checklist = await prisma.cK_Checklist.update({
      where: {
        CLid
      },
      data: {
        CLstatus: true
      }
    })

    return checklist
  }
  public async disable(CLid: string): Promise<CK_Checklist> {
    const checklist = await prisma.cK_Checklist.update({
      where: {
        CLid
      },
      data: {
        CLstatus: false
      }
    })

    return checklist
  }
  public async findById(CLid: string): Promise<CK_Checklist> {
    const checklist = await prisma.cK_Checklist.findUnique({
      where: {
        CLid
      }
    })

    return checklist
  }
  public async findActivated(): Promise<CK_Checklist[]> {
    const checklists = await prisma.cK_Checklist.findMany({
      where: {
        CLstatus: true
      }
    })

    return checklists
  }
  public async findDisabled(): Promise<CK_Checklist[]> {
    const checklists = await prisma.cK_Checklist.findMany({
      where: {
        CLstatus: false
      }
    })

    return checklists
  }
  public async findAll(): Promise<CK_Checklist[]> {
    const checklists = await prisma.cK_Checklist.findMany()

    return checklists
  }
}

export {
  PCKChecklistRepository
};