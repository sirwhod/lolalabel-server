"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RejectService = void 0;
class RejectService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute(idproduct, iduser) {
    const Product = await this.ProductRepository.reject(idproduct, iduser);
    return Product;
  }
}
exports.RejectService = RejectService;