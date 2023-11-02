import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../database';

interface ValidationInstructionRequest extends Request {
  body: {
    iduser: string,
    idinstruction: string,
    Precaution: string,
    language: string,
    modeOfUse: string,
    whatIAm: string,
    idproduct: string
  }
}

 const ValidationInstructionMiddleware = async (req: ValidationInstructionRequest, res: Response, next: NextFunction) => {
  try {
    const { idinstruction } = req.body;  

    const { language ,whatProduct } = await prisma.instructions.findUnique({
      where: {
        id: idinstruction
      }, 
      include: {
        whatProduct: true,
      }
    })

    const { Instructions } = await prisma.products.findUnique({
      where: {
        id: whatProduct.id
      },
      include: {
        Instructions: true
      }
    })

    const instruction = Instructions.find((instruction) => {
      return instruction.language === language && 
             instruction.isActive === true && 
             instruction.isValidated === true
    })

    if(instruction) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Instrução já existe e está ativa!',
      }); 
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Instrução não é valida!',
    });  
  }
};

export const precautionInstructionMiddleware = async (req: ValidationInstructionRequest, res: Response, next: NextFunction) => {
  try {
    const { Precaution } = req.body;  
    
    
   if (Precaution.length > 2000){
    return res.status(404).json({
      error: true,
      message: 'Erro: Número de caracteres no campo "Precaution" maior que 2000!',
    }); 
   }

    next();
    
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Erro não tratado, favor entrar em contato com o administrador!',
    }); 

  }
}

export const modeOfUseInstructionMiddleware = async (req: ValidationInstructionRequest, res: Response, next: NextFunction) => {
  try {
    const { modeOfUse } = req.body;  
    
    
   if (modeOfUse.length > 2000){
    return res.status(404).json({
      error: true,
      message: 'Erro: Número de caracteres no campo "modeOfUse" maior que 2000!',
    }); 
   }

    next();
    
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Erro não tratado, favor entrar em contato com o administrador!',
    }); 

  }
}

export const whatIAmInstructionMiddleware = async (req: ValidationInstructionRequest, res: Response, next: NextFunction) => {
  try {
    const { whatIAm } = req.body;  
    
    
   if (whatIAm.length > 2000){
    return res.status(404).json({
      error: true,
      message: 'Erro: Número de caracteres no campo "whatIAm" maior que 2000!',
    }); 
   }

    next();
    
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Erro não tratado, favor entrar em contato com o administrador!',
    }); 

  }
}

export default ValidationInstructionMiddleware;