import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  return res.send({message: '🚧Este é o endereço do Backend, seu acesso não está autorizado!🚧'});
});

export {
  router
};