"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestoreService = void 0;
class RestoreService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute(idproduct) {
    const Product = await this.ProductRepository.restore(idproduct);
    return Product;
  }
}
exports.RestoreService = RestoreService;