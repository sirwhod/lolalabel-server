import express from 'express';
import cors from 'cors';
import { router } from './routes';

import { instruction } from './routes/PR/instructions';
import { product } from './routes/PR/products';
import { user } from './routes/PR/user';
import { qrcode } from './routes/PR/qrcode';

import { clients } from './routes/PS/clients';
import { event } from './routes/PS/events';
import { auth } from './routes/PS/auth';
import { logs } from './routes/PR/logs';
import { all } from './routes/PR/all';
import { PCKuser } from './routes/PCK/PCKuser';
import { PCKstore } from './routes/PCK/PCKstore';
import { PCKProfile } from './routes/PCK/PCKprofile';
import { PCKChecklist } from './routes/PCK/PCKchecklist';
import { PCKTask } from './routes/PCK/PCKtask';

const app = express();

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3006', 'http://localhost:5173', 'http://localhost:3000', 'http://192.168.1.92', 'http://192.168.1.92:3000', 'http://label.lolafromrio.com.br', 'http://label.lolafromrio.com.br:3000'],
  methods: ['GET','OPTIONS','PATCH','DELETE','POST','PUT'],
  allowedHeaders: [
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'X-Api-Version',
    'Authorization'
  ]
}));

app.use(router);

// PR = Plataforma Rótulos

app.use(product);
app.use(instruction);
app.use(user);
app.use(qrcode);
app.use(logs);
app.use(all);

// PS = Plataforma Sorteios

app.use(clients)
app.use(event)
app.use(auth)

// PCK = Plataforma Checklist

app.use(PCKuser)
app.use(PCKstore)
app.use(PCKProfile)
app.use(PCKChecklist)
app.use(PCKTask)


export {
  app
};