"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindProductsRegistredService = void 0;
class FindProductsRegistredService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute() {
    const Product = await this.ProductRepository.registred();
    return Product;
  }
}
exports.FindProductsRegistredService = FindProductsRegistredService;