import { IProductRepository } from '../../../interfaces/PR/IProductRepository';


class RestoreService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(idproduct: string){
    const Product = await this.ProductRepository.restore(idproduct);

    return Product;
  }
}

export {
  RestoreService
};