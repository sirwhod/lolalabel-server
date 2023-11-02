
import { CK_ChecklistFilled, CK_ChecklistFinished, CK_ChecklistStarted, CK_Fill } from "@prisma/client";
import { prisma } from "../../database";
import { IPCKChecklistFilledRepository } from "../../interfaces/PCK/IChecklistFilledRepository";

class PCKChecklistFilledRepository implements IPCKChecklistFilledRepository {
  public async createCFL(CFLidChecklist: string): Promise<CK_ChecklistFilled> {
    const checklistFilled = await prisma.cK_ChecklistFilled.create({
      data: {
        CFLidChecklist,
        CFLcreatedAt: new Date()
      }
    })

    return checklistFilled
  }

  public async startCFL(
    CSidChecklistFilled: string,
    CSidUserStarted: string
  ): Promise<CK_ChecklistStarted> {
    const checklist = await prisma.cK_ChecklistFilled.update({
      where: {
        CFLid: CSidChecklistFilled
      },
      data: {
        CFLStarted: true
      }
    })

    if (checklist) { 
      const checklistStart = await prisma.cK_ChecklistStarted.create({
        data: {
          checklistFilled: {
            connect: {
              CFLid: CSidChecklistFilled
            }
          },
          user: {
            connect: {
              USid: CSidUserStarted
            }
          }, 
          CSstartedAt: new Date()
        }
      })
  
      return checklistStart
    }
  }

  public async finishCFL(
    CFidChecklistFilled: string,
    CFidUserFinished: string
  ): Promise<CK_ChecklistFinished> {
    const checklist = await prisma.cK_ChecklistFilled.update({
      where: {
        CFLid: CFidChecklistFilled
      },
      data: {
        CFLFinished: true
      }
    })

    if (checklist) {
      const checklistFinish = await prisma.cK_ChecklistFinished.create({
        data: {
          checklistFilled: {
            connect: {
              CFLid: CFidChecklistFilled
            }
          },
          user: {
            connect: {
              USid: CFidUserFinished
            }
          },
          CFfinishedAt: new Date()
        }
      })
  
      return checklistFinish
    }
  }

  public async findByIdCFL(
    CFLid: string
  ): Promise<CK_ChecklistFilled> {
    const checklist = await prisma.cK_ChecklistFilled.findUnique({
      where: {
        CFLid
      }
    })

    return checklist
  }

  public async findStartedCFL(): Promise<CK_ChecklistFilled[]> {
    const checklists = await prisma.cK_ChecklistFilled.findMany({
      where: {
        CFLStarted: true
      }
    })

    return checklists
  }

  public async findFinishedCFL(): Promise<CK_ChecklistFilled[]> {
    const checklists = await prisma.cK_ChecklistFilled.findMany({
      where: {
        CFLFinished: true
      }
    })

    return checklists
  }

  public async findAllCFL(): Promise<CK_ChecklistFilled[]> {
    const checklists = await prisma.cK_ChecklistFilled.findMany()

    return checklists
  }

  //Preenchimento de Tasks

  public async createFL(
    FLidTask: string, 
    FLidUser: string, 
    FLidChecklistFilled: string
  ): Promise<CK_Fill> {
    const fillTask = await prisma.cK_Fill.create({
      data: {
        task: {
          connect: {
            TKid: FLidTask
          }
        },
        user: {
          connect: {
            USid: FLidUser
          }
        },
        checklistFilled: {
          connect: {
            CFLid: FLidChecklistFilled
          }
        }
      }
    })

    return fillTask
  }

  public async modifyFL(
    FLid: string, 
    FLresponse: string, 
    FLcomment: string, 
    FLidUser: string 
  ): Promise<CK_Fill> {
    const fillTask = await prisma.cK_Fill.update({
      where: {
        FLid
      },
      data: {
        FLresponse,
        FLcomment,
        user: {
          connect: {
            USid: FLidUser
          }
        },
        FLfilledAt: new Date()
      }
    })

    return fillTask
  }

  public async findByIdFL(
    FLid: string
  ): Promise<CK_Fill> {
    const fillTask = await prisma.cK_Fill.findUnique({
      where: {
        FLid
      }
    })

    return fillTask
  }

  public async findByIdFLtoCFL(
    FLidChecklistFilled: string
  ): Promise<CK_Fill[]> {
    const fillTask = await prisma.cK_Fill.findMany({
      where: {
        FLidChecklistFilled
      }
    })

    return fillTask
  }

  public async findAllFL(): Promise<CK_Fill[]> {
    const fillTask = await prisma.cK_Fill.findMany()

    return fillTask
  }
}

export {
  PCKChecklistFilledRepository
};