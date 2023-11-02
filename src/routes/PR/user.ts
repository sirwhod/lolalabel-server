import express from 'express';
import authMiddleware from '../../middlewares/PR/auth';
import userMiddleware from '../../middlewares/PR/user';
import userController from '../../controllers/PR/userController';
import accessControlAllowOriginMiddlewarePR from '../../middlewares/accessControlAllowOriginPR';

const user = express.Router();

user.post(
  '/pr/user/new', 
  accessControlAllowOriginMiddlewarePR,
  authMiddleware, 
  userMiddleware,
  userController.createUser
);
user.post('/auth', 
  accessControlAllowOriginMiddlewarePR,
  userController.auth
);

user.get(
  '/pr/user/:username', 
  accessControlAllowOriginMiddlewarePR,
  authMiddleware, 
  userMiddleware, 
  userController.findUser
);
user.get(
  '/pr/users/registred',
  accessControlAllowOriginMiddlewarePR,
  authMiddleware, 
  userMiddleware, 
  userController.findManyUsers
);

user.put(
  '/pr/user/alter',
  accessControlAllowOriginMiddlewarePR,
  authMiddleware, 
  userMiddleware, 
  userController.alterUser
);
user.put(
  '/pr/user/alterpassword',
  accessControlAllowOriginMiddlewarePR,
  authMiddleware, 
  userMiddleware, 
  userController.alterPasswordUser
);

export {
  user
};
