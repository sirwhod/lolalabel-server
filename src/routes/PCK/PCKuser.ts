import express from 'express';
import PCKUserController from '../../controllers/PCK/PCKUserController';
import authMiddleware from '../../middlewares/PR/auth';

const PCKuser = express.Router();

// Auth

PCKuser.post(
  '/pck/user/auth', 
  PCKUserController.auth
);

// Create

PCKuser.post(
  '/pck/user/create', 
  authMiddleware,
  PCKUserController.createUser
);

// Find

PCKuser.get(
  '/pck/user/find/byUsername/:USusername', 
  authMiddleware, 
  PCKUserController.findUser
);

PCKuser.get(
  '/pck/user/find/all',
  authMiddleware,
  PCKUserController.findManyUsers
);

// Modification

PCKuser.put(
  '/pck/user/modification',
  authMiddleware, 
  PCKUserController.alterUser
);

PCKuser.put(
  '/pck/user/modification/password',
  authMiddleware, 
  PCKUserController.alterPasswordUser
);

export {
  PCKuser
};