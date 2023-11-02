import {Request, Response} from 'express';

import { PCKCreateChecklistService } from '../../service/PCK/Checklist/PCKCreateChecklistService';
import { PCKChecklistRepository } from '../../repositories/PCK/checklistRepositorie';
import { PCKFindByIdChecklistService } from '../../service/PCK/Checklist/PCKFindByIdChecklistService';
import { PCKActiveChecklistService } from '../../service/PCK/Checklist/PCKActiveChecklistService';
import { PCKDisableChecklistService } from '../../service/PCK/Checklist/PCKDisableChecklistService';
import { PCKFindActivatedChecklistService } from '../../service/PCK/Checklist/PCKFindActivatedChecklistService';
import { PCKFindDisabledChecklistService } from '../../service/PCK/Checklist/PCKFindDisabledChecklistService';
import { PCKFindAllChecklistService } from '../../service/PCK/Checklist/PCKFindAllChecklistService';

const createChecklist = new PCKCreateChecklistService(new PCKChecklistRepository());
const activeChecklist = new PCKActiveChecklistService(new PCKChecklistRepository());
const disableChecklist = new PCKDisableChecklistService(new PCKChecklistRepository());
const findByIdChecklist = new PCKFindByIdChecklistService(new PCKChecklistRepository());
const findActivatedChecklist = new PCKFindActivatedChecklistService(new PCKChecklistRepository());
const findDisabledChecklist = new PCKFindDisabledChecklistService(new PCKChecklistRepository());
const findAllChecklist = new PCKFindAllChecklistService(new PCKChecklistRepository());

interface UserRequestProps extends Request {
  body: {
    CLid: string, 
    CLname: string,
    CLidStore: string
  }
  params: {
    CLid: string, 
    CLname: string
  }
}

export default {
  async createChecklist(req: UserRequestProps, res: Response) {
    try {
      const { CLname, CLidStore } = req.body

      const Checklist = await createChecklist.execute(CLname, CLidStore)

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Checklist Cadastrado!',
        data: Checklist
      });
      
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  
  async alterStatusChecklist(req: UserRequestProps, res: Response) {
    try {
      const { CLid } = req.body
      const Checklist = await findByIdChecklist.execute(CLid)

      if (!Checklist) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Checklist não encontrado!'
        });
      }

      if (Checklist.CLstatus === false) {
        const alterChecklist = await activeChecklist.execute(Checklist.CLid)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Checklist ativado!',
          data: alterChecklist
        });
      } else {
        const alterChecklist = await disableChecklist.execute(Checklist.CLid)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Checklist desativado!',
          data: alterChecklist
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async findAllChecklist(req: UserRequestProps, res: Response) {
    const checklists = await findAllChecklist.execute()

    if (checklists.length === 0) {
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Nenhum checklist foi cadastrado ainda!'
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Sucesso: Todos os checklists encontrados!',
      data: checklists
    });

  },

  async findActivatedChecklist(req: UserRequestProps, res: Response) {
    const checklists = await findActivatedChecklist.execute()

    if (checklists.length === 0) {
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Nenhum checklist foi cadastrado ainda!'
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Sucesso: Todos os checklists ativos encontrados!',
      data: checklists
    });

  },

  async findDisabledChecklist(req: UserRequestProps, res: Response) {
    const checklists = await findDisabledChecklist.execute()

    if (checklists.length === 0) {
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Nenhum checklist foi cadastrado ainda!'
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Sucesso: Todos os checklists destivados encontrados!',
      data: checklists
    });

  },

  async findByIdChecklist(req: UserRequestProps, res: Response) {
    const { CLid } = req.params
    const checklists = await findByIdChecklist.execute(CLid)

    if (!checklists) {
      return res.status(201).json({
        error: true,
        message: 'Error: Nenhum checklist foi encontrado!'
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Sucesso: Checklist encontrado!',
      data: checklists
    });

  },
}