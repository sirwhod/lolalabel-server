"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qrcode = void 0;
var _express = _interopRequireDefault(require("express"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _database = require("../../database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const qrcode = _express.default.Router();
exports.qrcode = qrcode;
qrcode.get('/pr/qrcode/:idproduct', async (req, res) => {
  const {
    idproduct
  } = req.params;
  console.log('Id do produto:', idproduct);
  const qrCodeFilePath = _path.default.join(__dirname, `../../qrcode/${idproduct}.svg`);
  try {
    // Verifique se o arquivo SVG existe
    if (!_fs.default.existsSync(qrCodeFilePath)) {
      return res.status(404).json({
        error: true,
        message: 'Erro: QRCode Não Encontrado!'
      });
    }
    console.log('QRCode Encontrado!');
    // Define o tipo MIME apenas quando não é download
    res.header('Content-Type', 'image/svg+xml');
    const fileContents = _fs.default.readFileSync(qrCodeFilePath, 'utf8');
    return res.status(200).send(fileContents);
  } catch (error) {
    res.status(500).send(error);
  }
});
qrcode.get('/pr/qrcode/download/:idproduct', async (req, res) => {
  const {
    idproduct
  } = req.params;
  const qrCodeFilePath = _path.default.join(__dirname, `../../qrcode/${idproduct}.svg`);
  const product = await _database.prisma.products.findUnique({
    where: {
      id: idproduct
    }
  });
  try {
    // Verifique se o arquivo SVG existe
    if (!_fs.default.existsSync(qrCodeFilePath)) {
      return res.status(404).json({
        error: true,
        message: 'Erro: QRCode Não Encontrado!'
      });
    }
    res.header('Content-Disposition', `attachment; filename="qrcode_${product?.sku}_${product?.productLine}_${product?.productName}_${product?.version}.svg"`);
    const fileContents = _fs.default.readFileSync(qrCodeFilePath, 'utf8');
    return res.status(200).send(fileContents);
  } catch (error) {
    res.status(500).send(error);
  }
});