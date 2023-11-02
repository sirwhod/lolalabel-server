"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterService = void 0;
class AlterService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute(idproduct, productImage, Stamps) {
    const Product = await this.ProductRepository.alter(idproduct, productImage, Stamps);
    return Product;
  }
}
exports.AlterService = AlterService;