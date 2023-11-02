import express from 'express';

import authMiddleware from '../../middlewares/PR/auth';
import PCKChecklistFilledController from '../../controllers/PCK/PCKChecklistFilledController';

const PCKFill = express.Router();

// Create

PCKFill.post(
  '/pck/fill/cfl/start', 
  authMiddleware,
  PCKChecklistFilledController.startChecklistFilled
);

PCKFill.post(
  '/pck/fill/cfl/finish', 
  authMiddleware,
  PCKChecklistFilledController.finishChecklistFilled
);

// Modification

PCKFill.put(
  '/pck/fill', 
  authMiddleware,
  PCKChecklistFilledController.modifyFLChecklistFilled
);

// Find

PCKFill.get(
  '/pck/fill/find/all',
  authMiddleware,
  PCKChecklistFilledController.findAllFLChecklistFilled
);

PCKFill.get(
  '/pck/fill/find/byId/:FLid',
  authMiddleware,
  PCKChecklistFilledController.findByIdFLChecklistFilled
);

PCKFill.get(
  '/pck/fill/find/byIdCFL/:FLidChecklistFilled',
  authMiddleware,
  PCKChecklistFilledController.findByIdFLtoCFLFLChecklistFilled
);

PCKFill.get(
  '/pck/fill/cfl/find/all',
  authMiddleware,
  PCKChecklistFilledController.findAllCFLChecklistFilled
);

PCKFill.get(
  '/pck/fill/cfl/find/started',
  authMiddleware,
  PCKChecklistFilledController.findStartedCFLChecklistFilled
);

PCKFill.get(
  '/pck/fill/cfl/find/finished',
  authMiddleware,
  PCKChecklistFilledController.findFinishedCFLChecklistFilled
);

PCKFill.get(
  '/pck/fill/cfl/find/byId/:CFLid',
  authMiddleware,
  PCKChecklistFilledController.findByIdCFLChecklistFilled
);

export {
  PCKFill
};