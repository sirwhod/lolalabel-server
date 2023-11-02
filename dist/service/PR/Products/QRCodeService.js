"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QRCodeService = void 0;
class QRCodeService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async execute(idproduct) {
    const Product = await this.ProductRepository.qrcode(idproduct);
    return Product;
  }
}
exports.QRCodeService = QRCodeService;