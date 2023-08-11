import express from 'express';

const instruction = express.Router();

import instructionController from '../controllers/instructionController';
import authMiddleware from '../middlewares/auth';
import userMiddleware from '../middlewares/user';

instruction.post(
  '/pr/instructions/create', 
  authMiddleware, 
  userMiddleware,  
  instructionController.create
);

instruction.get(
  '/pr/instructions/registred', 
  authMiddleware, 
  userMiddleware, 
  instructionController.registred
);
instruction.get(
  '/pr/instructions/validation', 
  authMiddleware, userMiddleware, 
  instructionController.validation
);
instruction.get(
  '/pr/instructions/history', 
  authMiddleware, 
  userMiddleware, 
  instructionController.history
);

instruction.put(
  '/pr/instructions/accept', 
  authMiddleware, 
  userMiddleware, 
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