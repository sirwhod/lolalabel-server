"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindProductsHistoryService = void 0;
class FindProductsHistoryService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute() {
    const Product = await this.ProductRepository.history();
    return Product;
  }
}
exports.FindProductsHistoryService = FindProductsHistoryService;