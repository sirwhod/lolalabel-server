import {Request, Response} from 'express';
import { PCKStoreRepository } from '../../repositories/PCK/storeRepositorie';
import { PCKCreateStoreService } from '../../service/PCK/Store/PCKCreateStoreService';
import { PCKFindStoreService } from '../../service/PCK/Store/PCKFindStoreService';
import { PCKFindManyStoreService } from '../../service/PCK/Store/PCKFindManyStoreService';
import { PCKActiveStoreService } from '../../service/PCK/Store/PCKActiveStoreService';
import { PCKDisableStoreService } from '../../service/PCK/Store/PCKDisableStoreService';
import { PCKAlterNameStoreService } from '../../service/PCK/Store/PCKAlterNameStoreService';
import { PCKFindByIdStoreService } from '../../service/PCK/Store/PCKFindByIdStoreService';

const createStore = new PCKCreateStoreService(new PCKStoreRepository());
const findStore = new PCKFindStoreService(new PCKStoreRepository());
const findStoreByID = new PCKFindByIdStoreService(new PCKStoreRepository());
const findManyStore = new PCKFindManyStoreService(new PCKStoreRepository());
const activeStore = new PCKActiveStoreService(new PCKStoreRepository());
const disableStore = new PCKDisableStoreService(new PCKStoreRepository());
const alterNameStore = new PCKAlterNameStoreService(new PCKStoreRepository());

interface UserRequestProps extends Request {
  body: {
    STid: string, 
    STname: string
  }
  params: {
    STid: string, 
    STname: string
  }
}

export default {
  async createStore(req: UserRequestProps, res: Response) {
    try {
      const { STname } = req.body
      const storeExists = await findStore.execute(STname)

      if (storeExists) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Loja já existe!'
        });
      }

      const store = await createStore.execute(STname)

      if (store) {
        const storeData = await findStore.execute(store.STname)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Loja Cadastrada!',
          data: storeData
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async findStore(req: UserRequestProps, res: Response) {
    try {
      const { STname } = req.params
      const store = await findStore.execute(STname)

      if (!store) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Loja não encontrada!'
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Loja encontrada!',
        data: store
      });
      
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async findManyStore(req: UserRequestProps, res: Response) {
    try {
      const stores = await findManyStore.execute()

      if (!stores) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Lojas não encontradas!'
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Lojas encontradas!',
        data: stores
      });
      
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async alterStatusStore(req: UserRequestProps, res: Response) {
    try {
      const { STid } = req.body
      const store = await findStoreByID.execute(STid)

      if (!store) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Loja não encontrada!'
        });
      }

      if (store.STstatus === false) {
        const alterStore = await activeStore.execute(store.STid)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Loja ativada!',
          data: alterStore
        });
      } else {
        const alterStore = await disableStore.execute(store.STid)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Loja desativada!',
          data: alterStore
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async alterNameStore(req: UserRequestProps, res: Response) {
    try {
      const { STid, STname } = req.body
      const storeById = await findStoreByID.execute(STid)
      const storeByName = await findStore.execute(STname)

      if (!storeById) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Loja não encontrada!'
        });
      }

      if (storeByName) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Nome de loja já está sendo utilizado!'
        });
      }

      if (storeById.STname === STname) {
        return res.status(400).json({
          error: true,
          message: 'Erro: O nome já está sendo utilizado pela mesma loja!'
        });
      } else {
        const alterStore = await alterNameStore.execute(STid, STname)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Nome da Loja alterada!',
          data: alterStore
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },
}