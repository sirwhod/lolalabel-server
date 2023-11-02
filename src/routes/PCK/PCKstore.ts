import express from 'express';

import authMiddleware from '../../middlewares/PR/auth';
import PCKStoreController from '../../controllers/PCK/PCKStoreController';

const PCKstore = express.Router();

// Create

PCKstore.post(
  '/pck/store/create', 
  authMiddleware,
  PCKStoreController.createStore
);

// Find

PCKstore.get(
  '/pck/store/find/byName/:STname', 
  authMiddleware, 
  PCKStoreController.findStore
);

PCKstore.get(
  '/pck/store/find/all',
  authMiddleware,
  PCKStoreController.findManyStore
);

// Modification

PCKstore.put(
  '/pck/store/modification/name',
  authMiddleware, 
  PCKStoreController.alterNameStore
);

PCKstore.put(
  '/pck/store/modification/status',
  authMiddleware, 
  PCKStoreController.alterStatusStore
);


export {
  PCKstore
};