import { IProductRepository } from '../../../interfaces/PR/IProductRepository';

class DisableService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(idproduct: string, iduser: string, reason: string){
    const Product = await this.ProductRepository.disable(idproduct, iduser, reason);

    return Product;
  }
}

export {
  DisableService
};