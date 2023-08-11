import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { product } from './routes/products';
import { instruction } from './routes/instructions';
import { user } from './routes/user';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(product);
app.use(instruction);
app.use(user);

export {
  app
};