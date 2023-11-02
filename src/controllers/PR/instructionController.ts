import {Request, Response} from 'express';
import { CreateInstructionService } from '../../service/PR/Instructions/createInstructionService';
import { InstructionRepository } from '../../repositories/PR/instructionRepositorie';
import { RegistredInstructionService } from '../../service/PR/Instructions/registredInstructionService';
import { ValidationInstructionService } from '../../service/PR/Instructions/validationInstructionService';
import { HistoryInstructionService } from '../../service/PR/Instructions/historyInstructionService';
import { AcceptInstructionService } from '../../service/PR/Instructions/acceptInstructionService';
import { RejectInstructionService } from '../../service/PR/Instructions/rejectInstructionService';
import { DisableInstructionService } from '../../service/PR/Instructions/disableInstructionService';
import { RestoreInstructionService } from '../../service/PR/Instructions/restoreInstructionService';
import { HistoryRepositorie } from '../../repositories/PR/historyRepositorie';
import { CreateHistoryService } from '../../service/PR/History/CreateHistoryService';

const createHistory = new CreateHistoryService(new HistoryRepositorie())

const createInstruction = new CreateInstructionService(new InstructionRepository());
const registredInstruction = new RegistredInstructionService(new InstructionRepository());
const validationInstruction = new ValidationInstructionService(new InstructionRepository());
const historyInstruction = new HistoryInstructionService(new InstructionRepository());
const acceptInstruction = new AcceptInstructionService(new InstructionRepository());
const rejectInstruction = new RejectInstructionService(new InstructionRepository());
const disableInstruction = new DisableInstructionService(new InstructionRepository());
const restoreInstruction = new RestoreInstructionService(new InstructionRepository());

interface InstructionsRequestProps extends Request {
  body: {
    id: string;
    language: string;
    whatIAm: string;
    modeOfUse: string;
    Precaution: string;
    productId: string;
    authorId: string;
    creationDate: Date;
    updatedAt: Date;
    isActive: boolean;
    isValidated: boolean;
    reason: string;
    iduser: string;
    idproduct: string;
    idinstruction: string;
  }
  params: {
    idProduct: string;
    idUser: string;
  }
  headers: {

  }
}

export default {
  async create(req: InstructionsRequestProps, res: Response) {
    try {
      const { Precaution, language, modeOfUse, whatIAm, idproduct, iduser } = req.body;

      const instruction = await createInstruction.execute(
        language, 
        whatIAm, 
        modeOfUse, 
        Precaution, 
        idproduct, 
        iduser
      );

      const history = await createHistory.execute(
        'Criação de nova Instrução',
        false,
        `${instruction.language} - ${instruction.whatProduct.productLine} - ${instruction.whatProduct.productName} - ${instruction.whatProduct.version} - ${instruction.whatProduct.sku}`,
        iduser
      )

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Informações Cadastradas!',
        data: {
          instruction: instruction,
          history: history
        }
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async registred(_req: InstructionsRequestProps, res: Response) {
    try {

      const instructions = await registredInstruction.execute();

      if (instructions.length === 0) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Informações não encontradas!',
          data: instructions
        });
      }

      if (instructions) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Informações Encontradas!',
          data: instructions
        });
      }

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async validation(_req: InstructionsRequestProps, res: Response) {
    try {
      const instructions = await validationInstruction.execute();

      if (instructions.length === 0) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Informações não encontradas!',
          data: instructions
        });
      }

      if (instructions) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Informações Encontradas!',
          data: instructions
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async history(_req: InstructionsRequestProps, res: Response) {
    try {
      const instructions = await historyInstruction.execute();

      if (instructions.length === 0) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Informações não encontradas!',
          data: instructions
        });
      }

      if (instructions) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Informações Encontradas!',
          data: instructions
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async accept(req: InstructionsRequestProps, res: Response) {
    try {
      const { idinstruction, iduser } = req.body;

      const instruction = await acceptInstruction.execute(idinstruction, iduser);

      if (!instruction) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Instrução não encontrada!',
        });
      }

      const history = await createHistory.execute(
        'Aprovação de nova Instrução',
        false,
        `${instruction.language} - ${instruction.whatProduct.productLine} - ${instruction.whatProduct.productName} - ${instruction.whatProduct.version} - ${instruction.whatProduct.sku}`,
        iduser
      )

      if (instruction) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Instrução Aceita!',
          data: {
            instruction: instruction,
            history: history
          }
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async reject(req: InstructionsRequestProps, res: Response) {
    try {
      const { idinstruction, iduser } = req.body;

      const instruction = await rejectInstruction.execute(idinstruction, iduser);

      if (!instruction) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Instrução não encontrada!'
        });
      }

      const history = await createHistory.execute(
        'Rejeição de nova Instrução',
        false,
        `${instruction.language} - ${instruction.whatProduct.productLine} - ${instruction.whatProduct.productName} - ${instruction.whatProduct.version} - ${instruction.whatProduct.sku}`,
        iduser
      )

      if (instruction) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Instrução Rejeitada!',
          data: {
            instruction: instruction,
            history: history
          }
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async disable(req: InstructionsRequestProps, res: Response) {
    try {
      const { idinstruction, iduser, reason } = req.body;
      const instruction = await disableInstruction.execute(idinstruction, iduser, reason);

      if (!instruction) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Instrução não encontrada!',
          data: instruction
        });
      }

      const history = await createHistory.execute(
        'Desabilitação de Instrução',
        false,
        `${instruction.language} - ${instruction.whatProduct.productLine} - ${instruction.whatProduct.productName} - ${instruction.whatProduct.version} - ${instruction.whatProduct.sku}`,
        iduser
      )

      if (instruction) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Instrução desabilitada!',
          data: {
            instruction: instruction,
            history: history
          }
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async restore(req: InstructionsRequestProps, res: Response) {
    try {
      const { idinstruction, iduser } = req.body;
      
      const instruction = await restoreInstruction.execute(idinstruction);

      if (!instruction) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Instrução não encontrada!'
        });
      }

      const history = await createHistory.execute(
        'Restauração de Instrução',
        false,
        `${instruction.language} - ${instruction.whatProduct.productLine} - ${instruction.whatProduct.productName} - ${instruction.whatProduct.version} - ${instruction.whatProduct.sku}`,
        iduser
      )

      if (instruction) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Instrução restaurada!',
          data: {
            instruction: instruction,
            history: history
          }
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },
};