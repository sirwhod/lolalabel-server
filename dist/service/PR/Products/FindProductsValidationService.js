"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindProductsValidationService = void 0;
class FindProductsValidationService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute() {
    const Product = await this.ProductRepository.validation();
    return Product;
  }
}
exports.FindProductsValidationService = FindProductsValidationService;