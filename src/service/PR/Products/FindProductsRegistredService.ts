import { IProductRepository } from '../../../interfaces/PR/IProductRepository';

class FindProductsRegistredService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(){
    const Product = await this.ProductRepository.registred();

    return Product;
  }
}

export {
  FindProductsRegistredService
};