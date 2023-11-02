import express from 'express';
import authController from '../../controllers/PS/authController';
import accessControlAllowOriginMiddleware from '../../middlewares/accessControlAllowOrigin';

const auth = express.Router();

auth.post(
  '/ps/auth',
  accessControlAllowOriginMiddleware,
  authController.auth 
);

export {
  auth
};