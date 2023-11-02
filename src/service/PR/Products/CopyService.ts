import { IProductRepository } from '../../../interfaces/PR/IProductRepository';

class CopyProductService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(
    iduser: string, 
    idProduct: string, 
    newVersion: string, 
    composition: string, 
    compositionINCI: string,
    copyInstruction: boolean
  ){
    const Product = await this.ProductRepository.copy(
      iduser, 
      idProduct, 
      newVersion, 
      composition, 
      compositionINCI,
      copyInstruction
    );

    return Product;
  }
}

export {
  CopyProductService
};