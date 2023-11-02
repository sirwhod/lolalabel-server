import { IProductRepository } from '../../../interfaces/PR/IProductRepository';

class AcceptService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(idproduct: string, iduser: string){
    const Product = await this.ProductRepository.accept(idproduct, iduser);

    return Product;
  }
}

export {
  AcceptService
};