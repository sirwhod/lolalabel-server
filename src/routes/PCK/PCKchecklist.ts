import express from 'express';

import authMiddleware from '../../middlewares/PR/auth';
import PCKChecklistController from '../../controllers/PCK/PCKChecklistController';

const PCKChecklist = express.Router();

// Create

PCKChecklist.post(
  '/pck/checklist/create', 
  authMiddleware,
  PCKChecklistController.createChecklist
);

// Find

PCKChecklist.get(
  '/pck/checklist/find/all',
  authMiddleware,
  PCKChecklistController.findAllChecklist
);

PCKChecklist.get(
  '/pck/checklist/find/activated',
  authMiddleware,
  PCKChecklistController.findActivatedChecklist
);

PCKChecklist.get(
  '/pck/checklist/find/disabled',
  authMiddleware,
  PCKChecklistController.findDisabledChecklist
);

PCKChecklist.get(
  '/pck/checklist/find/byId/:CLid', 
  authMiddleware, 
  PCKChecklistController.findByIdChecklist
);

// Modification

PCKChecklist.put(
  '/pck/checklist/modification/status',
  authMiddleware, 
  PCKChecklistController.alterStatusChecklist
);


export {
  PCKChecklist
};