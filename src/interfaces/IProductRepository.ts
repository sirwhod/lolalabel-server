import { Products } from '@prisma/client';
import { Instruction } from './Product/IInstruction';
import { ProductsDisabled } from './Product/IProductDisabled';
import { Stamp } from './Product/IStamp';
import { User } from './Product/IUser';

type ResponseProduct = {
  id: string
  sku: string
  version: string
  productName: string
  productLine: string
  productImage: string
  composition: string
  Stamps: Stamp[]
  whoCreated: User
  Instructions: Instruction[]
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  qrCodeIsActive: boolean
  ProductsDisabled: ProductsDisabled[]
}

export interface IProductRepository {
  create(
    idUser: string,
    sku: string,
    version: string,
    productName: string,
    productLine: string,
    productImage: string,
    composition: string,
    Stamps: Stamp[]
    ): Promise<Products>;
  copy(
    iduser: string, 
    idProduct: string, 
    newVersion: string, 
    composition: string, 
    copyInstruction: boolean
  ): Promise<ResponseProduct>;
  alter(idproduct: string, productImage: string, Stamps: Stamp[]): Promise<ResponseProduct>;
  registred(): Promise<ResponseProduct[]>;
  validation(): Promise<ResponseProduct[]>;
  history(): Promise<ResponseProduct[]>;
  find(id: string): Promise<ResponseProduct>;
  accept(idproduct: string, iduser: string): Promise<ResponseProduct>;
  reject(idproduct: string, iduser: string): Promise<ResponseProduct>;
  disable(idproduct: string, iduser: string, reason: string): Promise<ResponseProduct>;
  restore(idproduct: string): Promise<ResponseProduct>;
}