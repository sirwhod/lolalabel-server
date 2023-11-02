import express from 'express';

import authMiddleware from '../../middlewares/PR/auth';
import PCKTaskController from '../../controllers/PCK/PCKTaskController';

const PCKTask = express.Router();

// Create

PCKTask.post(
  '/pck/task/create', 
  authMiddleware,
  PCKTaskController.createTask
);

PCKTask.post(
  '/pck/task/create/many', 
  authMiddleware,
  PCKTaskController.createManyTasks
);

// Find

PCKTask.get(
  '/pck/task/find/all',
  authMiddleware,
  PCKTaskController.findAllTask
);

PCKTask.get(
  '/pck/task/find/activated',
  authMiddleware,
  PCKTaskController.findActivatedTask
);

PCKTask.get(
  '/pck/task/find/disabled',
  authMiddleware,
  PCKTaskController.findDisabledTask
);

PCKTask.get(
  '/pck/task/find/byId/:TKid', 
  authMiddleware, 
  PCKTaskController.findByIdTask
);

PCKTask.get(
  '/pck/task/find/byIdChecklist/:TKidChecklist', 
  authMiddleware, 
  PCKTaskController.findByIdChecklistTask
);

// Modification

PCKTask.put(
  '/pck/task/modification/status',
  authMiddleware, 
  PCKTaskController.alterStatusTask
);

PCKTask.put(
  '/pck/task/modification/name',
  authMiddleware, 
  PCKTaskController.alterName
);

PCKTask.put(
  '/pck/task/modification/description',
  authMiddleware, 
  PCKTaskController.alterDescription
);


export {
  PCKTask
};