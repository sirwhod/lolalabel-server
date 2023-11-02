import { Stamp } from './Product/IStamp';

interface User {
  id: string
  name: string
}

interface Product {
  id: string
  sku: string
  version: string
  productName: string
  productLine: string
  productImage: string
  composition: string
  authorId: string
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  qrCodeIsActive: boolean
  Stamps: Stamp[]
}

type ResponseInstruction = {
  id: string
  language: string
  whatIAm: string
  modeOfUse: string
  Precaution: string
  productId: string
  authorId: string
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  whatProduct: Product
  whoCreated: User
}

export interface IInstructionRepository {
  create(
    language: string, 
    whatIAm: string, 
    modeOfUse: string, 
    Precaution: string, 
    idproduct: string, 
    iduser: string
  ): Promise<ResponseInstruction>;
  copyMany(
    idproduct: string,
    newIdproduct: string
  ): Promise<ResponseInstruction[]>;
  registred(): Promise<ResponseInstruction[]>;
  validation(): Promise<ResponseInstruction[]>;
  history(): Promise<ResponseInstruction[]>;
  accept(
    idinstruction: string, 
    iduser: string
  ): Promise<ResponseInstruction>
  reject(
    idinstruction: string, 
    iduser: string
  ): Promise<ResponseInstruction>
  disable(
    idinstruction: string, 
    iduser: string, 
    reason: string
  ): Promise<ResponseInstruction>
  restore(
    idinstruction: string
  ): Promise<ResponseInstruction>
}