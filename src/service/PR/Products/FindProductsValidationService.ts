import { IProductRepository } from '../../../interfaces/PR/IProductRepository';

class FindProductsValidationService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(){
    const Product = await this.ProductRepository.validation();

    return Product;
  }
}

export {
  FindProductsValidationService
};