"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyProductService = void 0;
class CopyProductService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute(iduser, idProduct, newVersion, composition, compositionINCI, copyInstruction) {
    const Product = await this.ProductRepository.copy(iduser, idProduct, newVersion, composition, compositionINCI, copyInstruction);
    return Product;
  }
}
exports.CopyProductService = CopyProductService;