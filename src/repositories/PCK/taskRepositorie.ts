
import { CK_Task } from "@prisma/client";
import { prisma } from "../../database";
import { CreateTask, IPCKTaskRepository } from "../../interfaces/PCK/ITaskRepository";

class PCKTaskRepository implements IPCKTaskRepository {
  public async create(
    TKidChecklist: string, 
    TKname: string, 
    TKdescription: string
  ): Promise<CK_Task> {
    const task = await prisma.cK_Task.create({
      data: {
        TKname,
        TKdescription,
        TKstatus: true,
        checklist: {
          connect: {
            CLid: TKidChecklist
          }
        }
      }
    })

    return task
  }

  public async modifyName(
    TKid: string, 
    TKname: string
  ): Promise<CK_Task> {
    const task = await prisma.cK_Task.update({
      where: {
        TKid
      },
      data: {
        TKname
      }
    })

    return task
  }

  public async modifyDescription(
    TKid: string, 
    TKdescription: string
  ): Promise<CK_Task> {
    const task = await prisma.cK_Task.update({
      where: {
        TKid
      },
      data: {
        TKdescription
      }
    })

    return task
  }

  public async active(
    TKid: string
  ): Promise<CK_Task> {
    const task = await prisma.cK_Task.update({
      where: {
        TKid
      },
      data: {
        TKstatus: true
      }
    })

    return task
  }

  public async disable(
    TKid: string
  ): Promise<CK_Task> {
    const task = await prisma.cK_Task.update({
      where: {
        TKid
      },
      data: {
        TKstatus: false
      }
    })

    return task
  }

  public async findById(
    TKid: string
  ): Promise<CK_Task> {
    const task = await prisma.cK_Task.findUnique({
      where: {
        TKid
      }
    })

    return task
  }

  public async findByIdChecklist(
    TKidChecklist: string
  ): Promise<CK_Task[]> {
    const task = await prisma.cK_Task.findMany({
      where: {
        TKidChecklist
      }
    })

    return task
  }

  public async findActivated(): Promise<CK_Task[]> {
    const task = await prisma.cK_Task.findMany({
      where: {
        TKstatus: true
      }
    })

    return task
  }
  public async findDisabled(): Promise<CK_Task[]> {
    const task = await prisma.cK_Task.findMany({
      where: {
        TKstatus: false
      }
    })

    return task
  }
  public async findAll(): Promise<CK_Task[]> {
    const task = await prisma.cK_Task.findMany()

    return task
  }
  
}

export {
  PCKTaskRepository
};