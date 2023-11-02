import { IProductRepository } from '../../../interfaces/PR/IProductRepository';

class QRCodeService {
  constructor(
    private ProductRepository: IProductRepository
  ){ }

  public async execute(idproduct: string){
    const Product = await this.ProductRepository.qrcode(idproduct);

    return Product;
  }
}

export {
  QRCodeService
};