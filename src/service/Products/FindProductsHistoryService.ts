import { IProductRepository } from '../../interfaces/IProductRepository';

class FindProductsHistoryService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(){
    const Product = await this.ProductRepository.history();

    return Product;
  }
}

export {
  FindProductsHistoryService
};