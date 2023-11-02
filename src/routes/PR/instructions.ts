import express from 'express';

const instruction = express.Router();

import instructionController from '../../controllers/PR/instructionController';
import authMiddleware from '../../middlewares/PR/auth';
import userMiddleware from '../../middlewares/PR/user';
import ValidationInstructionMiddleware, { modeOfUseInstructionMiddleware, precautionInstructionMiddleware, whatIAmInstructionMiddleware } from '../../middlewares/PR/validateInstructiont';


instruction.post(
  '/pr/instructions/create', 
  authMiddleware, 
  userMiddleware,  
  precautionInstructionMiddleware,
  modeOfUseInstructionMiddleware,
  whatIAmInstructionMiddleware,
  instructionController.create

);

instruction.get(
  '/pr/instructions/registred', 
  userMiddleware, 
  instructionController.registred
);
instruction.get(
  '/pr/instructions/validation', 
  userMiddleware, 
  instructionController.validation
);
instruction.get(
  '/pr/instructions/history', 
  userMiddleware, 
  instructionController.history
);

instruction.put(
  '/pr/instructions/accept', 
  authMiddleware, 
  userMiddleware,
  ValidationInstructionMiddleware,
  instructionController.accept
);
instruction.put(
  '/pr/instructions/reject', 
  authMiddleware, 
  userMiddleware, 
  instructionController.reject
);
instruction.put(
  '/pr/instructions/disable', 
  authMiddleware, 
  userMiddleware, 
  instructionController.disable
);
instruction.put(
  '/pr/instructions/restore', 
  authMiddleware, 
  userMiddleware, 
  instructionController.restore
);

export {
  instruction
};