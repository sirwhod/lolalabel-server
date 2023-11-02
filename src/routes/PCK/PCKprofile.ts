import express from 'express';

import authMiddleware from '../../middlewares/PR/auth';
import PCKProfileController from '../../controllers/PCK/PCKProfileController';

const PCKProfile = express.Router();

// Create

PCKProfile.post(
  '/pck/profile/create', 
  authMiddleware,
  PCKProfileController.createProfile
);

// Find

PCKProfile.get(
  '/pck/profile/find/byId/:PRid', 
  authMiddleware, 
  PCKProfileController.findProfile
);

PCKProfile.get(
  '/pck/profile/find/all',
  authMiddleware,
  PCKProfileController.findManyProfile
);

// Modification

PCKProfile.put(
  '/pck/profile/modification/name',
  authMiddleware, 
  PCKProfileController.alterNameProfile
);

PCKProfile.put(
  '/pck/profile/modification/status',
  authMiddleware, 
  PCKProfileController.alterStatusProfile
);


export {
  PCKProfile
};