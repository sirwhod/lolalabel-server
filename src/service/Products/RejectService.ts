import { IProductRepository } from '../../interfaces/IProductRepository';

class RejectService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(idproduct: string, iduser: string){
    const Product = await this.ProductRepository.reject(idproduct, iduser);

    return Product;
  }
}

export {
  RejectService
};