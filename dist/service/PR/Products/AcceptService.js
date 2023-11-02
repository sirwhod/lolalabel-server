"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptService = void 0;
class AcceptService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute(idproduct, iduser) {
    const Product = await this.ProductRepository.accept(idproduct, iduser);
    return Product;
  }
}
exports.AcceptService = AcceptService;