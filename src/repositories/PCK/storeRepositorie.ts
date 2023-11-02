import { CK_Store } from "@prisma/client";
import { IPCKStoreRepository } from "../../interfaces/PCK/IStoreRepository";
import { prisma } from "../../database";

class PCKStoreRepository implements IPCKStoreRepository {
  public async create(STname: string): Promise<CK_Store> {
    const store = await prisma.cK_Store.create({
      data: {
        STname,
        STstatus: true
      }
    })

    return store
  }

  public async find(STname: string): Promise<CK_Store> {
    const store = await prisma.cK_Store.findUnique({
      where: {
        STname
      }
    })

    return store
  }

  public async findById(STid: string): Promise<CK_Store> {
    const store = await prisma.cK_Store.findUnique({
      where: {
        STid
      }
    })

    return store
  }

  public async findMany(): Promise<CK_Store[]> {
    const stores = await prisma.cK_Store.findMany()

    return stores
  }

  public async active(STid: string): Promise<CK_Store> {
    const store = await prisma.cK_Store.update({
      where: {
        STid
      },
      data: {
        STstatus: true
      }
    })

    return store
  }

  public async disable(STid: string): Promise<CK_Store> {
    const store = await prisma.cK_Store.update({
      where: {
        STid
      },
      data: {
        STstatus: false
      }
    })

    return store
  }
  
  public async alterName(STid: string, STname: string): Promise<CK_Store> {
    const store = await prisma.cK_Store.update({
      where: {
        STid
      },
      data: {
        STname
      }
    })

    return store
  }

}

export {
  PCKStoreRepository
};