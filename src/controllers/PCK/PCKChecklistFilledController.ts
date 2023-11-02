import {Request, Response} from 'express';
import { PCKChecklistFilledRepository } from '../../repositories/PCK/checklistFilledRepositorie';
import { PCKCreateCFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKCreateCFLChecklistFilledService';
import { PCKStartCFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKStartCFLChecklistFilledService';
import { PCKFinishCFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKFinishCFLChecklistFilledService';
import { PCKFindByIdCFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKFindByIdCFLChecklistFilledService';
import { PCKFindStartedCFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKFindStartedCFLChecklistFilledService';
import { PCKFindFinishedCFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKFindFinishedCFLChecklistFilledService';
import { PCKFindAllCFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKFindAllCFLChecklistFilledService';
import { PCKCheckIdCFLTodayChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKCheckIdCFLTodayCFLChecklistFilledService';
import { PCKTaskRepository } from '../../repositories/PCK/taskRepositorie';
import { PCKFindByIdChecklistTaskService } from '../../service/PCK/Task/PCKFindByIdCheckListTaskService';
import { PCKCreateFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKCreateFLChecklistFilledService';
import { PCKModifyFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKModifyFLChecklistFilledService';
import { PCKFindByIdFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKFindByIdFLChecklistFilledService';
import { PCKFindByIdFLtoCFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKFindByIdFLtoCFLChecklistFilledService';
import { PCKFindAllFLChecklistFilledService } from '../../service/PCK/ChecklistFilled/PCKFindAllFLChecklistFilledService';

const findByIdChecklistTask = new PCKFindByIdChecklistTaskService(new PCKTaskRepository());

const createCFLChecklistFilled = new PCKCreateCFLChecklistFilledService(new PCKChecklistFilledRepository());
const startCFLChecklistFilled = new PCKStartCFLChecklistFilledService(new PCKChecklistFilledRepository());
const finishCFLChecklistFilled = new PCKFinishCFLChecklistFilledService(new PCKChecklistFilledRepository());
const findByIdCFLChecklistFilled = new PCKFindByIdCFLChecklistFilledService(new PCKChecklistFilledRepository());
const findStartedCFLChecklistFilled = new PCKFindStartedCFLChecklistFilledService(new PCKChecklistFilledRepository());
const findFinishedCFLChecklistFilled = new PCKFindFinishedCFLChecklistFilledService(new PCKChecklistFilledRepository());
const findAllCFLChecklistFilled = new PCKFindAllCFLChecklistFilledService(new PCKChecklistFilledRepository());
const checkIdCFLTodayChecklistFilled = new PCKCheckIdCFLTodayChecklistFilledService(new PCKChecklistFilledRepository());

const createFLChecklistFilled = new PCKCreateFLChecklistFilledService(new PCKChecklistFilledRepository());
const modifyFLChecklistFilled = new PCKModifyFLChecklistFilledService(new PCKChecklistFilledRepository());
const findByIdFLChecklistFilled = new PCKFindByIdFLChecklistFilledService(new PCKChecklistFilledRepository());
const findByIdFLtoCFLChecklistFilled = new PCKFindByIdFLtoCFLChecklistFilledService(new PCKChecklistFilledRepository());
const findAllFLChecklistFilled = new PCKFindAllFLChecklistFilledService(new PCKChecklistFilledRepository());

interface UserRequestProps extends Request {
  body: {
    CSidChecklistFilled: string,
    CSidUserStarted: string,
    
    CFidChecklistFilled: string,
    CFLidChecklist: string,
    CFidUserFinished: string,
    CFLid: string,

    FLidTask: string,
    FLidUser: string,
    FLidChecklistFilled: string,
    FLid: string,
    FLresponse: string,
    FLcomment: string
  }
  params: {
    CSidChecklistFilled: string,
    CSidUserStarted: string,
    
    CFLidChecklist: string,
    CFidUserFinished: string,
    CFLid: string,
    
    FLidTask: string,
    FLidUser: string,
    FLidChecklistFilled: string,
    FLid: string,
  }
}

export default {
  async startChecklistFilled(req: UserRequestProps, res: Response) {
    try {
      const { CFLidChecklist, CSidUserStarted } = req.body

      const ChecklistFilledToday = await checkIdCFLTodayChecklistFilled.execute(CFLidChecklist, new Date())

      if (ChecklistFilledToday !== null) {
        return res.status(401).json({
          error: true,
          message: 'Erro: Já existe um checklist ativo para a data de hoje!'
        });
      }

      const checklistFilled = await createCFLChecklistFilled.execute(CFLidChecklist)

      if (!checklistFilled) {
        return res.status(401).json({
          error: true,
          message: 'Erro: Não foi possivel criar o checklist!'
        });
      }

      const tasks = await findByIdChecklistTask.execute(CFLidChecklist)

      if (!tasks) {
        return res.status(401).json({
          error: true,
          message: 'Erro: Não foi possivel buscar as tarefas!'
        });
      }
      
      const startChecklist = await startCFLChecklistFilled.execute(checklistFilled.CFLid, CSidUserStarted)

      if (!startChecklist) {
        return res.status(401).json({
          error: true,
          message: 'Erro: Não foi possivel iniciar os checklist!'
        });
      }

      const createTasks = tasks.map( async (task) => {
        await createFLChecklistFilled.execute(task.TKid, CSidUserStarted, checklistFilled.CFLid)
      })

      if (!createTasks) {
        return res.status(401).json({
          error: true,
          message: 'Erro: Não foi possivel criar as tarefas!'
        });
      }

      const startedChecklistFilled = await findByIdCFLChecklistFilled.execute(checklistFilled.CFLid)

      if (!startedChecklistFilled) {
        return res.status(401).json({
          error: true,
          message: 'Erro: Não foi possivel encontrar os checklist iniciado!'
        });
      }
      
      return res.status(201).json({
        error: false,
        message: 'Sucesso: O Checklist foi iniciado com sucesso!',
        data: startedChecklistFilled
      });
      
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async finishChecklistFilled(req: UserRequestProps, res: Response) {
      try {
        const { CFidChecklistFilled, CFidUserFinished } = req.body

        const ChecklistFilledToday = await checkIdCFLTodayChecklistFilled.execute(CFidChecklistFilled, new Date())

        if (ChecklistFilledToday !== null) {
          return res.status(401).json({
            error: true,
            message: 'Erro: Não existe um checklist ativo para a data de hoje!'
          });
        }
  
        const ChecklistFilled = await finishCFLChecklistFilled.execute(CFidChecklistFilled, CFidUserFinished)

        if (!ChecklistFilled) {
          return res.status(401).json({
            error: true,
            message: 'Erro: Checklists não encontrados!'
          });
        }
  
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Checklist finalizado!',
          data: ChecklistFilled
        });
        
      } catch (err) {
        return res.status(512).json({message: err.message});
      }
    },

    async findByIdCFLChecklistFilled(req: UserRequestProps, res: Response) {
      try {
        const { CFLid } = req.params

        const ChecklistFilled = await findByIdCFLChecklistFilled.execute(CFLid)

        if (!ChecklistFilled) {
          return res.status(401).json({
            error: true,
            message: 'Erro: Checklist não encontrado!'
          });
        }

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Checklist encontrado!',
          data: ChecklistFilled
        });
        
      } catch (err) {
        return res.status(512).json({message: err.message});
      }
    },

    async findStartedCFLChecklistFilled(_req: UserRequestProps, res: Response) {
      try {
        const ChecklistFilled = await findStartedCFLChecklistFilled.execute()

        if (!ChecklistFilled) {
          return res.status(401).json({
            error: true,
            message: 'Erro: Checklists não encontrados!'
          });
        }

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Checklists iniciados encontrados!',
          data: ChecklistFilled
        });
        
      } catch (err) {
        return res.status(512).json({message: err.message});
      }
    },

    async findFinishedCFLChecklistFilled(req: UserRequestProps, res: Response) {
      try {
        const ChecklistFilled = await findFinishedCFLChecklistFilled.execute()

        if (!ChecklistFilled) {
          return res.status(401).json({
            error: true,
            message: 'Erro: Checklists não encontrados!'
          });
        }

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Checklists finalizados encontrados!',
          data: ChecklistFilled
        });
        
      } catch (err) {
        return res.status(512).json({message: err.message});
      }
    },

    async findAllCFLChecklistFilled(_req: UserRequestProps, res: Response) {
      try {
        const ChecklistFilled = await findAllCFLChecklistFilled.execute()

        if (!ChecklistFilled) {
          return res.status(401).json({
            error: true,
            message: 'Erro: Checklists não encontrados!'
          });
        }

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Checklists encontrados!',
          data: ChecklistFilled
        });
        
      } catch (err) {
        return res.status(512).json({message: err.message});
      }
    },

    async modifyFLChecklistFilled(req: UserRequestProps, res: Response) {
      try {
        const { FLid, FLresponse, FLcomment, FLidUser, CFLidChecklist } = req.body

        const ChecklistFilledToday = await checkIdCFLTodayChecklistFilled.execute(CFLidChecklist, new Date())

        if (ChecklistFilledToday === null) {
          return res.status(401).json({
            error: true,
            message: 'Erro: Não existe um checklist ativo para a data de hoje!'
          });
        }

        const TaskFilled = await modifyFLChecklistFilled.execute(FLid, FLresponse, FLcomment, FLidUser )

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Tarefa preenchida!',
          data: TaskFilled
        });
        
      } catch (err) {
        return res.status(512).json({message: err.message});
      }
    },

    async findAllFLChecklistFilled(_req: UserRequestProps, res: Response) {
      try {
        const taksFilled = await findAllFLChecklistFilled.execute()

        if (!taksFilled) {
          return res.status(401).json({
            error: true,
            message: 'Erro: Tarefas não encontradas!'
          });
        }

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Tarefas encontradas!',
          data: taksFilled
        });
        
      } catch (err) {
        return res.status(512).json({message: err.message});
      }
    },

    async findByIdFLChecklistFilled(req: UserRequestProps, res: Response) {
      try {
        const { FLid } = req.params

        const taksFilled = await findByIdFLChecklistFilled.execute(FLid)

        if (!taksFilled) {
          return res.status(401).json({
            error: true,
            message: 'Erro: Tarefa não encontrada!'
          });
        }

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Tarefa encontrada!',
          data: taksFilled
        });
        
      } catch (err) {
        return res.status(512).json({message: err.message});
      }
    },

    async findByIdFLtoCFLFLChecklistFilled(req: UserRequestProps, res: Response) {
      try {
        const { FLidChecklistFilled } = req.params

        const taksFilled = await findByIdFLtoCFLChecklistFilled.execute(FLidChecklistFilled)

        if (!taksFilled) {
          return res.status(401).json({
            error: true,
            message: 'Erro: Tarefas não encontradas!'
          });
        }

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Tarefas encontradas!',
          data: taksFilled
        });
        
      } catch (err) {
        return res.status(512).json({message: err.message});
      }
    },

}