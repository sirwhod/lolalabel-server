import express from 'express';
import clientsController from '../../controllers/PS/clientsController';
import accessControlAllowOriginMiddleware from '../../middlewares/accessControlAllowOrigin';

const clients = express.Router();

clients.post(
  '/ps/clients/create',
  accessControlAllowOriginMiddleware,
  clientsController.createClient  
);

clients.get(
  '/ps/clients/search/:nameevent',
  accessControlAllowOriginMiddleware,
  clientsController.findManyClients  
);

export {
  clients
};