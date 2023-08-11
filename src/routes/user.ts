import express from 'express';

const user = express.Router();

import userController from '../controllers/userController';
import authMiddleware from '../middlewares/auth';
import userMiddleware from '../middlewares/user';

user.post(
  '/pr/user/new', 
  authMiddleware, 
  userMiddleware, 
  userController.createUser
);
user.post('/auth', userController.auth);

user.get(
  '/pr/user/:username', 
  authMiddleware, 
  userMiddleware, 
  userController.findUser
);
user.get(
  '/pr/users/registred', 
  authMiddleware, 
  userMiddleware, 
  userController.findManyUsers
);

user.put(
  '/pr/user/alter', 
  authMiddleware, 
  userMiddleware, 
  userController.alterUser
);
user.put(
  '/pr/user/alterpassword', 
  authMiddleware, 
  userMiddleware, 
  userController.alterPasswordUser
);

export {
  user
};
