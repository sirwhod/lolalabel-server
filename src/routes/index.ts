import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  return res.send({message: '🚧Seu acesso não está autorizado!🚧'});
});

export {
  router
};