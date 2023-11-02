import express from 'express';
import {Request, Response} from 'express';

import { prisma } from '../../database';

const logs = express.Router();

logs.get('/pr/logs', async (_req: Request, res: Response) => {
  try {
    const logsList = await prisma.log.findMany({
      include: {
        agent: {
          select: {
            id: true,
            name: true
          }
        }
      }, 
      orderBy: {
        creationDate: 'desc'
      }
    })
  
  
    return res.status(201).json({
      error: false,
      message: 'Sucesso: Histórico encontrado!',
      data: {
        history: logsList
      }
    });
  } catch (err) {

  }
});

export {
  logs
};
