import {Request, Response} from 'express';

import { PCKCreateProfileService } from '../../service/PCK/Profile/PCKCreateProfileService';
import { PCKFindProfileService } from '../../service/PCK/Profile/PCKFindProfileService';
import { PCKFindManyProfileService } from '../../service/PCK/Profile/PCKFindManyProfileService';

import { PCKDisableProfileService } from '../../service/PCK/Profile/PCKDisableProfileService';
import { PCKAlterNameProfileService } from '../../service/PCK/Profile/PCKAlterNameProfileService';
import { PCKProfileRepository } from '../../repositories/PCK/profileRepositorie';
import { PCKActiveProfileService } from '../../service/PCK/Profile/PCKActiveProfileService';

const createProfile = new PCKCreateProfileService(new PCKProfileRepository());
const findProfile = new PCKFindProfileService(new PCKProfileRepository());
const findManyProfile = new PCKFindManyProfileService(new PCKProfileRepository());
const activeProfile = new PCKActiveProfileService(new PCKProfileRepository());
const disableProfile = new PCKDisableProfileService(new PCKProfileRepository());
const alterNameProfile = new PCKAlterNameProfileService(new PCKProfileRepository());

interface UserRequestProps extends Request {
  body: {
    PRid: string, 
    PRname: string
  }
  params: {
    PRid: string, 
    PRname: string
  }
}

export default {
  async createProfile(req: UserRequestProps, res: Response) {
    try {
      const { PRname } = req.body
      const ProfileExists = await findProfile.execute(PRname)

      if (ProfileExists) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Perfil já existe!'
        });
      }

      const Profile = await createProfile.execute(PRname)

      if (Profile) {
        const ProfileData = await findProfile.execute(Profile.PRid)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Perfil Cadastrado!',
          data: ProfileData
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async findProfile(req: UserRequestProps, res: Response) {
    try {
      const { PRid } = req.params
      const Profile = await findProfile.execute(PRid)

      if (!Profile) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Perfil não encontrado!'
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Perfil encontrado!',
        data: Profile
      });
      
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async findManyProfile(req: UserRequestProps, res: Response) {
    try {
      const Profiles = await findManyProfile.execute()

      if (!Profiles) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Perfis não encontrados!'
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Perfis encontrados!',
        data: Profiles
      });
      
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async alterStatusProfile(req: UserRequestProps, res: Response) {
    try {
      const { PRid } = req.body
      const Profile = await findProfile.execute(PRid)

      if (!Profile) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Perfil não encontrado!'
        });
      }

      if (Profile.PRstatus === false) {
        const alterProfile = await activeProfile.execute(Profile.PRid)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Perfil ativado!',
          data: alterProfile
        });
      } else {
        const alterProfile = await disableProfile.execute(Profile.PRid)

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Perfil desativado!',
          data: alterProfile
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async alterNameProfile(req: UserRequestProps, res: Response) {
    try {
      const { PRid, PRname } = req.body
      const ProfileByName = await findProfile.execute(PRname)

      if (ProfileByName) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Nome do Perfil já está sendo utilizado!'
        });
      }

      const alterProfile = await alterNameProfile.execute(PRid, PRname)

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Nome do Perfil alterado!',
        data: alterProfile
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },
}