import { CK_Profile } from "@prisma/client";
import { IPCKProfileRepository } from "../../interfaces/PCK/IProfileRepository";
import { prisma } from "../../database";

class PCKProfileRepository implements IPCKProfileRepository {
  public async create(PRname: string): Promise<CK_Profile> {
    const Profile = await prisma.cK_Profile.create({
      data: {
        PRname,
        PRstatus: true
      }
    })

    return Profile
  }

  public async find(PRid: string): Promise<CK_Profile> {
    const Profile = await prisma.cK_Profile.findUnique({
      where: {
        PRid
      }
    })

    return Profile
  }

  public async findMany(): Promise<CK_Profile[]> {
    const Profiles = await prisma.cK_Profile.findMany()

    return Profiles
  }

  public async active(PRid: string): Promise<CK_Profile> {
    const Profile = await prisma.cK_Profile.update({
      where: {
        PRid
      },
      data: {
        PRstatus: true
      }
    })

    return Profile
  }

  public async disable(PRid: string): Promise<CK_Profile> {
    const Profile = await prisma.cK_Profile.update({
      where: {
        PRid
      },
      data: {
        PRstatus: false
      }
    })

    return Profile
  }
  
  public async alterName(PRid: string, PRname: string): Promise<CK_Profile> {
    const Profile = await prisma.cK_Profile.update({
      where: {
        PRid
      },
      data: {
        PRname
      }
    })

    return Profile
  }

}

export {
  PCKProfileRepository
};