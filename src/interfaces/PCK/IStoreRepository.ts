import { CK_Store } from "@prisma/client";

export interface IPCKStoreRepository {
  create(STname: string): Promise<CK_Store>
  find(STname: string): Promise<CK_Store>
  findById(STid: string): Promise<CK_Store>
  findMany(): Promise<CK_Store[]>
  active(STid: string): Promise<CK_Store>
  disable(STid: string): Promise<CK_Store>
  alterName(STid: string, STname: string): Promise<CK_Store>
}