import { IProductRepository } from '../../interfaces/IProductRepository';

class FindProductService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(
    id: string, 
  ){
    const Product = await this.ProductRepository.find(id);

    return Product;
  }
}

export {
  FindProductService
};