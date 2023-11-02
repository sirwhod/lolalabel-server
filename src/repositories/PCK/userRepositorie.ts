import { CK_User } from "@prisma/client";

import { hash, compare } from 'bcryptjs';

import { 
  CKAuthResponse, 
  CKResposeUser, 
  IPCKUserRepository 
} from "../../interfaces/PCK/IUserRepository";

import { prisma } from "../../database";

import { tokenGenerator } from "../../utils/PR/tokenAuth";

class PCKUserRepository implements IPCKUserRepository {

  public async create(
    USname: string,
    USusername: string,
    USpassword: string,
    USregistration: string,
    USidProfile: string,
    USidStore: string
  ): Promise<CK_User> {
    const hash_password = await hash(USpassword, 8);

    const user = await prisma.cK_User.create({
      data: {
        USusername: USusername,
        USname: USname,
        USpassword: hash_password,
        USregistration: USregistration,
        USstatus: true,
        profile: {
          connect: {
            PRid: USidProfile
          }
        },
        store: {
          connect: {
            STid: USidStore
          }
        }
      }
    })

    return user;
  }

  public async auth(
    USusername: string, 
    USpassword: string
  ): Promise<CKAuthResponse> {
    const user = await prisma.cK_User.findFirst({
      where: {
        USusername,
        USstatus: true
      }
    })

    const isValuePassword = await compare(USpassword, user.USpassword);

    if (isValuePassword) {
      const token = tokenGenerator(user.USid);

      return {
        user: {
          USid: user.USid,
          USname: user.USname,
          USusername: user.USusername,
          USregistration: user.USregistration,
          USstatus: user.USstatus,
          USidProfile: user.USidProfile,
          USidStore: user.USidStore
        },
        CKtoken: token
      }
    }
  }

  public async find(
    USusername: string
  ): Promise<CKResposeUser> {
      const user = await prisma.cK_User.findUnique({
        where: {
          USusername
        },
        select: {
          USid: true,
          USname: true,
          USusername: true,
          USregistration: true,
          USstatus: true,
          USidProfile: true,
          USidStore: true
        }
      })

      return user
  }

  public async findMany(): Promise<CKResposeUser[]> {
      const users = await prisma.cK_User.findMany({
        select: {
          USid: true,
          USname: true,
          USusername: true,
          USregistration: true,
          USstatus: true,
          USidProfile: true,
          USidStore: true
        }
      })

      return users
  }

  public async alter(
    USid: string,
    USidProfile: string,
    USidStore: string,
    USstatus: boolean
  ): Promise<CKResposeUser> {
      const user = await prisma.cK_User.update({
        where: {
          USid,
        },
        data: {
          profile: {
            update: {
              PRid: USidProfile
            }
          },
          store: {
            update: {
              STid: USidStore
            }
          },
          USstatus
        },
        select: {
          USid: true,
          USname: true,
          USusername: true,
          USregistration: true,
          USstatus: true,
          USidProfile: true,
          USidStore: true
        }
      })

      return user
  }

  public async alterPassword(
    USid: string,
    USpassword: string
  ): Promise<CKResposeUser> {
      const hash_password = await hash(USpassword, 8);

      const user = await prisma.cK_User.update({
        where: {
          USid
        },
        data: {
          USpassword: hash_password
        },
        select: {
          USid: true,
          USname: true,
          USusername: true,
          USregistration: true,
          USstatus: true,
          USidProfile: true,
          USidStore: true
        }
      })

      return user
  }

}

export {
  PCKUserRepository
};