import {Request, Response} from 'express';

import { PCKCreateTaskService } from '../../service/PCK/Task/PCKCreateTaskService';
import { PCKTaskRepository } from '../../repositories/PCK/taskRepositorie';
import { PCKFindByIdTaskService } from '../../service/PCK/Task/PCKFindByIdTaskService';
import { PCKActiveTaskService } from '../../service/PCK/Task/PCKActiveTaskService';
import { PCKDisableTaskService } from '../../service/PCK/Task/PCKDisableTaskService';
import { PCKFindActivatedTaskService } from '../../service/PCK/Task/PCKFindActivatedTaskService';
import { PCKFindDisabledTaskService } from '../../service/PCK/Task/PCKFindDisabledTaskService';
import { PCKFindAllTaskService } from '../../service/PCK/Task/PCKFindAllTaskService';
import { PCKModifyNameTaskService } from '../../service/PCK/Task/PCKModifyNameTaskService';
import { PCKModifyDescriptionTaskService } from '../../service/PCK/Task/PCKModifyDescriptionTaskService';
import { PCKFindByIdChecklistTaskService } from '../../service/PCK/Task/PCKFindByIdCheckListTaskService';
import { CreateTask } from '../../interfaces/PCK/ITaskRepository';

const createTask = new PCKCreateTaskService(new PCKTaskRepository());
const modifyNameTask = new PCKModifyNameTaskService(new PCKTaskRepository());
const modifyDescriptionTask = new PCKModifyDescriptionTaskService(new PCKTaskRepository());
const activeTask = new PCKActiveTaskService(new PCKTaskRepository());
const disableTask = new PCKDisableTaskService(new PCKTaskRepository());
const findByIdTask = new PCKFindByIdTaskService(new PCKTaskRepository());
const findByIdChecklistTask = new PCKFindByIdChecklistTaskService(new PCKTaskRepository());
const findActivatedTask = new PCKFindActivatedTaskService(new PCKTaskRepository());
const findDisabledTask = new PCKFindDisabledTaskService(new PCKTaskRepository());
const findAllTask = new PCKFindAllTaskService(new PCKTaskRepository());

interface UserRequestProps extends Request {
  body: {
    TKid: string,
    TKidChecklist: string, 
    TKname: string, 
    TKdescription: string,
    TKtasks: CreateTask[]
  }
  params: {
    TKid: string,
    TKidChecklist: string,
  }
}

export default {
  async createTask(req: UserRequestProps, res: Response) {
    try {
      const { TKidChecklist, TKname, TKdescription } = req.body

      const Task = await createTask.execute(TKidChecklist, TKname, TKdescription)

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Tarefa Cadastrada!',
        data: Task
      });
      
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async createManyTasks(req: UserRequestProps, res: Response) {
    try {
      const { TKidChecklist, TKtasks } = req.body
  
      TKtasks.map(async (TKtask) => {
        const { TKname, TKdescription } = TKtask
  
        await createTask.execute(TKidChecklist, TKname, TKdescription )
      })
  
      const tasks = await findByIdChecklistTask.execute(TKidChecklist)
  
      if (tasks) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Tarefas Cadastradas!',
          data: tasks
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },
  
  async alterStatusTask(req: UserRequestProps, res: Response) {
    try {
      const { TKid } = req.body
      const Task = await findByIdTask.execute(TKid)

      if (!Task) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Task não encontrado!'
        });
      }

      if (Task.TKstatus === false) {
        const alterTask = await activeTask.execute(Task.TKid)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Tarefa ativada!',
          data: alterTask
        });
      } else {
        const alterTask = await disableTask.execute(Task.TKid)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Tarefa desativada!',
          data: alterTask
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async alterName(req: UserRequestProps, res: Response) {
    try {
      const { TKid, TKname } = req.body;
      const TaskFind = await findByIdTask.execute(TKid)

      if (!TaskFind) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Task não encontrado!'
        });
      }

      const task = await modifyNameTask.execute(TKid, TKname)
  
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Nome da Tarefa alterado!',
        data: task
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async alterDescription(req: UserRequestProps, res: Response) {
    try {
      const { TKid, TKdescription } = req.body;
      const TaskFind = await findByIdTask.execute(TKid)

      if (!TaskFind) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Task não encontrado!'
        });
      }

      const task = await modifyDescriptionTask.execute(TKid, TKdescription)
  
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Descrição da Tarefa alterada!',
        data: task
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async findAllTask(req: UserRequestProps, res: Response) {
    const Tasks = await findAllTask.execute()

    if (Tasks.length === 0) {
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Nenhuma Tarefa foi cadastrada ainda!'
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Sucesso: Todas as Tarefas encontradas!',
      data: Tasks
    });

  },

  async findActivatedTask(req: UserRequestProps, res: Response) {
    const Tasks = await findActivatedTask.execute()

    if (Tasks.length === 0) {
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Nenhuma Tarefa foi cadastrada ainda!'
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Sucesso: Todas as Tarefas ativas encontradas!',
      data: Tasks
    });

  },

  async findDisabledTask(req: UserRequestProps, res: Response) {
    const Tasks = await findDisabledTask.execute()

    if (Tasks.length === 0) {
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Nenhuma Tarefa foi cadastrada ainda!'
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Sucesso: Todas as Tarefas destivadas encontradas!',
      data: Tasks
    });

  },

  async findByIdTask(req: UserRequestProps, res: Response) {
    const { TKid } = req.params
    const Tasks = await findByIdTask.execute(TKid)

    if (!Tasks) {
      return res.status(201).json({
        error: true,
        message: 'Error: Nenhuma Tarefa foi encontrada!'
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Sucesso: Tarefa encontrada!',
      data: Tasks
    });

  },

  async findByIdChecklistTask(req: UserRequestProps, res: Response) {
    const { TKidChecklist } = req.params
    const Tasks = await findByIdChecklistTask.execute(TKidChecklist)

    if (!Tasks) {
      return res.status(201).json({
        error: true,
        message: 'Error: Nenhuma Tarefa foi encontrada!'
      });
    }

    return res.status(201).json({
      error: false,
      message: 'Sucesso: Tarefa encontrada!',
      data: Tasks
    });

  },
}