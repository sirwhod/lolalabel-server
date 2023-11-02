"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProductService = void 0;
class CreateProductService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute(idUser, sku, version, productName, productLine, productImage, composition, compositionINCI, Stamps) {
    const Product = await this.ProductRepository.create(idUser, sku, version, productName, productLine, productImage, composition, compositionINCI, Stamps);
    return Product;
  }
}
exports.CreateProductService = CreateProductService;