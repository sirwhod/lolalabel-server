import { IProductRepository } from '../../../interfaces/PR/IProductRepository';
import { Stamp } from '../../../interfaces/PR/Product/IStamp';


class CreateProductService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(
    idUser: string,
    sku: string,
    version: string,
    productName: string,
    productLine: string,
    productImage: string,
    composition: string,
    compositionINCI: string,
    Stamps: Stamp[]
  ){
    const Product = await this.ProductRepository.create(
      idUser,
      sku,
      version,
      productName,
      productLine,
      productImage,
      composition,
      compositionINCI,
      Stamps
    );

    return Product;
  }
}

export {
  CreateProductService
};