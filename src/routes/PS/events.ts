import express from 'express';
import eventsController from '../../controllers/PS/eventsController';
import accessControlAllowOriginMiddleware from '../../middlewares/accessControlAllowOrigin';


const event = express.Router();



event.get(
  '/ps/events/search',
  accessControlAllowOriginMiddleware,
  eventsController.findManyEvents  
);

event.get(
  '/ps/events/search/:nameevent',
  accessControlAllowOriginMiddleware,
  eventsController.findEvent  
);

event.post(
  '/ps/events/create',
  accessControlAllowOriginMiddleware,
  eventsController.createEvent  
);

event.put(
  '/ps/events/drawprize',
  accessControlAllowOriginMiddleware,
  eventsController.drawprizeEvents  
);

event.put(
  '/ps/events/action/:idEvent',
  accessControlAllowOriginMiddleware,
  eventsController.actionEvents  
);

export {
  event
};
