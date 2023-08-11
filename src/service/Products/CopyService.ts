import { IProductRepository } from '../../interfaces/IProductRepository';

class CopyProductService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(
    iduser: string, 
    idProduct: string, 
    newVersion: string, 
    composition: string, 
    copyInstruction: boolean
  ){
    const Product = await this.ProductRepository.copy(
      iduser, 
      idProduct, 
      newVersion, 
      composition, 
      copyInstruction
    );

    return Product;
  }
}

export {
  CopyProductService
};