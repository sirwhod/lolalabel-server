"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableService = void 0;
class DisableService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute(idproduct, iduser, reason) {
    const Product = await this.ProductRepository.disable(idproduct, iduser, reason);
    return Product;
  }
}
exports.DisableService = DisableService;