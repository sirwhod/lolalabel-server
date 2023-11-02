import express from 'express';
import {Request, Response} from 'express';

import { prisma } from '../../database';

const all = express.Router();

all.get('/pr/instructions/all', async (_req: Request, res: Response) => {
  try {
    const allInstructionCount = await prisma.instructions.count()
    const allInstructionsAccepted = await prisma.instructionsValidate.count({
      where: {
        instructionAccept: true,
        whatInstruction: {
          isActive: true
        }
      }
    })
    const allInstructionsRejected = await prisma.instructionsValidate.count({
      where: {
        instructionAccept: false
      }
    })
    const allInstructionsDisabled = await prisma.instructionsDisabled.count()
    const allInstructionsInValidation = await prisma.instructions.count({
      where: {
        isActive: false,
        isValidated: false
      }
    })

    const countValues = {
      registredInstruction: allInstructionCount,
      instructionsAccepted: allInstructionsAccepted,
      instructionsRejected: allInstructionsRejected,
      instructionsDisabled: allInstructionsDisabled,
      instructionsInValidation: allInstructionsInValidation
    }  
  
    return res.status(201).json({
      error: false,
      message: 'Sucesso: Contagem de instruções encontrada!',
      data: {
        count: countValues
      }
    });
  } catch (err) {

  }
});

all.get('/pr/products/all', async (_req: Request, res: Response) => {
  try {
    const allProductCount = await prisma.products.count()
  const allQrcodeCreated = await prisma.products.count({
    where: {
      qrCodeIsActive: true,
      isActive: true,
      isValidated: true,
    }
  })
  const allProductsAccepted = await prisma.productsValidated.count({
    where: {
      productAccepted: true,
      whatProduct: {
        isActive: true
      }
    }
  })
  const allProductsRejected = await prisma.productsValidated.count({
    where: {
      productAccepted: false
    }
  })
  const allProductsDisabled = await prisma.productsDisabled.count()
  const allProductsInValidation = await prisma.products.count({
    where: {
      isActive: false,
      isValidated: false
    }
  })

  const countValues = {
    registredProduct: allProductCount,
    qrcodeGenerated: allQrcodeCreated,
    productsAccepted: allProductsAccepted,
    productsRejected: allProductsRejected,
    productsDisabled: allProductsDisabled,
    productsInValidation: allProductsInValidation
  }
  
    return res.status(201).json({
      error: false,
      message: 'Sucesso: Contagem de produtos encontrada!',
      data: {
        count: countValues
      }
    });
  } catch (err) {

  }
});

export {
  all
};
