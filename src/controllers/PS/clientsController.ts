import {Request, Response} from 'express';
import { ClientsRepository } from '../../repositories/PS/clientsRepositorie';
import { CreateClientService } from '../../service/PS/Clients/createClientService';
import { FindManyClientService } from '../../service/PS/Clients/findManyClientService';

const createClient = new CreateClientService(new ClientsRepository());
const findManyClient = new FindManyClientService(new ClientsRepository());

interface ClientsRequestProps extends Request {
  body: {
    name: string, 
    email: string, 
    event: string, 
    news: boolean, 
    phone: string
  },
  
  params: {
    nameevent: string,
  }
}

export default {
  async createClient(req: ClientsRequestProps, res: Response) {
    try {
      const { name, email, event, news, phone } = req.body

      const newClient = await createClient.execute(
        name, 
        email, 
        event, 
        news, 
        phone
      )

      if (!newClient) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Cliente não cadastrado!',
          data: null
        });
      }

      if (newClient) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Cliente cadastrado!',
          data: newClient
        });
      }

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async findManyClients(req: ClientsRequestProps, res: Response) {
    try {
      const { nameevent } = req.params

      const clients = await findManyClient.execute(nameevent)
      
      if (!clients) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Clientes não encontrados!',
          data: null
        });
      }

      if (clients) {
        return res.status(200).json({
          error: false,
          message: 'Sucesso: Clientes encontrados!',
          data: clients
        });
      }

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

}