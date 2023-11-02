"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createInstructionService = require("../../service/PR/Instructions/createInstructionService");
var _instructionRepositorie = require("../../repositories/PR/instructionRepositorie");
var _registredInstructionService = require("../../service/PR/Instructions/registredInstructionService");
var _validationInstructionService = require("../../service/PR/Instructions/validationInstructionService");
var _historyInstructionService = require("../../service/PR/Instructions/historyInstructionService");
var _acceptInstructionService = require("../../service/PR/Instructions/acceptInstructionService");
var _rejectInstructionService = require("../../service/PR/Instructions/rejectInstructionService");
var _disableInstructionService = require("../../service/PR/Instructions/disableInstructionService");
var _restoreInstructionService = require("../../service/PR/Instructions/restoreInstructionService");
var _historyRepositorie = require("../../repositories/PR/historyRepositorie");
var _CreateHistoryService = require("../../service/PR/History/CreateHistoryService");
const createHistory = new _CreateHistoryService.CreateHistoryService(new _historyRepositorie.HistoryRepositorie());
const createInstruction = new _createInstructionService.CreateInstructionService(new _instructionRepositorie.InstructionRepository());
const registredInstruction = new _registredInstructionService.RegistredInstructionService(new _instructionRepositorie.InstructionRepository());
const validationInstruction = new _validationInstructionService.ValidationInstructionService(new _instructionRepositorie.InstructionRepository());
const historyInstruction = new _historyInstructionService.HistoryInstructionService(new _instructionRepositorie.InstructionRepository());
const acceptInstruction = new _acceptInstructionService.AcceptInstructionService(new _instructionRepositorie.InstructionRepository());
const rejectInstruction = new _rejectInstructionService.RejectInstructionService(new _instructionRepositorie.InstructionRepository());
const disableInstruction = new _disableInstructionService.DisableInstructionService(new _instructionRepositorie.InstructionRepository());
const restoreInstruction = new _restoreInstructionService.RestoreInstructionService(new _instructionRepositorie.InstructionRepository());
var _default = {
  async create(req, res) {
    try {
      const {
        Precaution,
        language,
        modeOfUse,
        whatIAm,
        idproduct,
        iduser
      } = req.body;
      const instruction = await createInstruction.execute(language, whatIAm, modeOfUse, Precaution, idproduct, iduser);
      const history = await createHistory.execute('Criação de nova Instrução', false, `${instruction.language} - ${instruction.whatProduct.productLine} - ${instruction.whatProduct.productName} - ${instruction.whatProduct.version} - ${instruction.whatProduct.sku}`, iduser);
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Informações Cadastradas!',
        data: {
          instruction: instruction,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async registred(_req, res) {
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
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async validation(_req, res) {
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
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async history(_req, res) {
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
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async accept(req, res) {
    try {
      const {
        idinstruction,
        iduser
      } = req.body;
      const instruction = await acceptInstruction.execute(idinstruction, iduser);
      if (!instruction) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Instrução não encontrada!'
        });
      }
      const history = await createHistory.execute('Aprovação de nova Instrução', false, `${instruction.language} - ${instruction.whatProduct.productLine} - ${instruction.whatProduct.productName} - ${instruction.whatProduct.version} - ${instruction.whatProduct.sku}`, iduser);
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
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async reject(req, res) {
    try {
      const {
        idinstruction,
        iduser
      } = req.body;
      const instruction = await rejectInstruction.execute(idinstruction, iduser);
      if (!instruction) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Instrução não encontrada!'
        });
      }
      const history = await createHistory.execute('Rejeição de nova Instrução', false, `${instruction.language} - ${instruction.whatProduct.productLine} - ${instruction.whatProduct.productName} - ${instruction.whatProduct.version} - ${instruction.whatProduct.sku}`, iduser);
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
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async disable(req, res) {
    try {
      const {
        idinstruction,
        iduser,
        reason
      } = req.body;
      const instruction = await disableInstruction.execute(idinstruction, iduser, reason);
      if (!instruction) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Instrução não encontrada!',
          data: instruction
        });
      }
      const history = await createHistory.execute('Desabilitação de Instrução', false, `${instruction.language} - ${instruction.whatProduct.productLine} - ${instruction.whatProduct.productName} - ${instruction.whatProduct.version} - ${instruction.whatProduct.sku}`, iduser);
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
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async restore(req, res) {
    try {
      const {
        idinstruction,
        iduser
      } = req.body;
      const instruction = await restoreInstruction.execute(idinstruction);
      if (!instruction) {
        return res.status(412).json({
          error: true,
          message: 'Erro: Instrução não encontrada!'
        });
      }
      const history = await createHistory.execute('Restauração de Instrução', false, `${instruction.language} - ${instruction.whatProduct.productLine} - ${instruction.whatProduct.productName} - ${instruction.whatProduct.version} - ${instruction.whatProduct.sku}`, iduser);
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
      return res.status(512).json({
        message: err.message
      });
    }
  }
};
exports.default = _default;