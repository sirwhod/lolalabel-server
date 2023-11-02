import { CK_Profile } from "@prisma/client";

export interface IPCKProfileRepository {
  create(PRname: string): Promise<CK_Profile>
  find(PRid: string): Promise<CK_Profile>
  findMany(): Promise<CK_Profile[]>
  active(PRid: string): Promise<CK_Profile>
  disable(PRid: string): Promise<CK_Profile>
  alterName(PRid: string, PRname: string): Promise<CK_Profile>
}