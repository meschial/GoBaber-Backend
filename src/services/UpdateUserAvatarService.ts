import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import AppError from '../errors/AppError'

import uploadConfig from '../config/upload'
import User from '../models/Users'

interface Request{
  user_id: string
  avatarFileName: string
}

class UpdateUserAvatarService{
  public async execute({user_id, avatarFileName}: Request): Promise<User>{
    const userRepository = getRepository(User)

    const user = await userRepository.findOne(user_id)

    if (!user){
      throw new AppError('Usuário não encontrado!', 401)
    }

    if(user.avatar){

      const userAvatarFilePatch = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePatch)

      if(userAvatarFileExist){
        await fs.promises.unlink(userAvatarFilePatch)
      }
    }

    user.avatar = avatarFileName

    await userRepository.save(user)

    return user;
  }
}

export default UpdateUserAvatarService