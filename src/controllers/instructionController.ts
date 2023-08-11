import {Request, Response} from 'express';
import { CreateInstructionService } from '../service/Instructions/createInstructionService';
import { InstructionRepository } from '../repositories/instructionRepositorie';
import { RegistredInstructionService } from '../service/Instructions/registredInstructionService';
import { ValidationInstructionService } from '../service/Instructions/validationInstructionService';
import { HistoryInstructionService } from '../service/Instructions/historyInstructionService';
import { AcceptInstructionService } from '../service/Instructions/acceptInstructionService';
import { RejectInstructionService } from '../service/Instructions/rejectInstructionService';
import { DisableInstructionService } from '../service/Instructions/disableInstructionService';
import { RestoreInstructionService } from '../service/Instructions/restoreInstructionService';

const createInstruction = new CreateInstructionService(new InstructionRepository());
const registredInstruction = new RegistredInstructionService(new InstructionRepository());
const validationInstruction = new ValidationInstructionService(new InstructionRepository());
const historyInstruction = new HistoryInstructionService(new InstructionRepository());
const acceptInstruction = new AcceptInstructionService(new InstructionRepository());
const rejectInstruction = new RejectInstructionService(new InstructionRepository());
const disableInstruction = new DisableInstructionService(new InstructionRepository());
const restoreInstruction = new RestoreInstructionService(new InstructionRepository());

interface InstructionsProps extends Request {
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
  }
  params: {
    idProduct: string;
    idUser: string;
  }
  headers: {
    iduser: string;
    idproduct: string;
  }
}

export default {
  async create(req: InstructionsProps, res: Response) {
    try {
      const { Precaution, language, modeOfUse, whatIAm } = req.body;
      const { idproduct, iduser } = req.headers;

      const instruction = await createInstruction.execute(
        language, 
        whatIAm, 
        modeOfUse, 
        Precaution, 
        idproduct, 
        iduser
      );

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Informações Cadastradas!',
        data: instruction
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async registred(_req: InstructionsProps, res: Response) {
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

  async validation(_req: InstructionsProps, res: Response) {
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

  async history(_req: InstructionsProps, res: Response) {
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

  async accept(req: InstructionsProps, res: Response) {
    try {
      const { idproduct, iduser } = req.headers;
      const instructions = await acceptInstruction.execute(idproduct, iduser);

      if (!instructions) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Informações não encontradas!',
          data: instructions
        });
      }

      if (instructions) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Instrução Aceita!',
          data: instructions
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async reject(req: InstructionsProps, res: Response) {
    try {
      const { idproduct, iduser } = req.headers;
      const instructions = await rejectInstruction.execute(idproduct, iduser);

      if (!instructions) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Informações não encontradas!',
          data: instructions
        });
      }

      if (instructions) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Instrução Rejeitada!',
          data: instructions
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async disable(req: InstructionsProps, res: Response) {
    try {
      const { idproduct, iduser } = req.headers;
      const { reason } = req.body;
      const instructions = await disableInstruction.execute(idproduct, iduser, reason);

      if (!instructions) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Informações não encontradas!',
          data: instructions
        });
      }

      if (instructions) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Instrução desabilitada!',
          data: instructions
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async restore(req: InstructionsProps, res: Response) {
    try {
      const { idproduct } = req.headers;
      const instructions = await restoreInstruction.execute(idproduct);

      if (!instructions) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Informações não encontradas!',
          data: instructions
        });
      }

      if (instructions) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Instrução restaurada!',
          data: instructions
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },
};