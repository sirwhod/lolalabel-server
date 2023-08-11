import { IProductRepository } from '../../interfaces/IProductRepository';
import { Stamp } from '../../interfaces/Product/IStamp';

class AlterService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(idproduct: string, productImage: string, Stamps: Stamp[]){
    const Product = await this.ProductRepository.alter(idproduct, productImage, Stamps);

    return Product;
  }
}

export {
  AlterService
};