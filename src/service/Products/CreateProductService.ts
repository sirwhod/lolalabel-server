import { IProductRepository } from '../../interfaces/IProductRepository';
import { Stamp } from '../../interfaces/Product/IStamp';


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
      Stamps
    );

    return Product;
  }
}

export {
  CreateProductService
};