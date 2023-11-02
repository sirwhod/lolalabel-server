"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindProductService = void 0;
class FindProductService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute(id) {
    const Product = await this.ProductRepository.find(id);
    return Product;
  }
}
exports.FindProductService = FindProductService;