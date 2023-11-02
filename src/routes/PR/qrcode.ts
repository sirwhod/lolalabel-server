import express from 'express';
import {Request, Response} from 'express';


import fs from 'fs';
import path from 'path';
import { prisma } from '../../database';

const qrcode = express.Router();

interface ProductProps extends Request {
  params: {
    idproduct: string;
  }
}

qrcode.get('/pr/qrcode/:idproduct', async (req: ProductProps, res: Response) => {
  const { idproduct } = req.params;

  console.log('Id do produto:', idproduct )

  const qrCodeFilePath = path.join(__dirname, `../../qrcode/${idproduct}.svg`);

  try {
    // Verifique se o arquivo SVG existe
    if (!fs.existsSync(qrCodeFilePath)) {
      return res.status(404).json({
        error: true,
        message: 'Erro: QRCode Não Encontrado!',
      });
    }
    console.log('QRCode Encontrado!')
    // Define o tipo MIME apenas quando não é download
    res.header('Content-Type', 'image/svg+xml');

    const fileContents = fs.readFileSync(qrCodeFilePath, 'utf8');
    return res.status(200).send(fileContents);
  } catch (error) {
    res.status(500).send(error);
  }
});

qrcode.get('/pr/qrcode/download/:idproduct', async (req: ProductProps, res: Response) => {
  const { idproduct } = req.params;

  const qrCodeFilePath = path.join(__dirname, `../../qrcode/${idproduct}.svg`);

  const product = await prisma.products.findUnique({
    where: {
      id: idproduct,
    },
  });

  try {
    // Verifique se o arquivo SVG existe
    if (!fs.existsSync(qrCodeFilePath)) {
      return res.status(404).json({
        error: true,
        message: 'Erro: QRCode Não Encontrado!',
      });
    }

    
    res.header('Content-Disposition', `attachment; filename="qrcode_${product?.sku}_${product?.productLine}_${product?.productName}_${product?.version}.svg"`);

    const fileContents = fs.readFileSync(qrCodeFilePath, 'utf8');
    return res.status(200).send(fileContents);
  } catch (error) {
    res.status(500).send(error);
  }
});

export {
  qrcode
};
