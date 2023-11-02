import { IAuthRepository } from "../../../interfaces/PS/IAuthRepository";

class AuthService {
  constructor(
    private authRepository: IAuthRepository
  ){ }

  public async execute(
    password: string,
    username: string
  ){
    const event = await this.authRepository.auth(
      password,
      username
    )

    return event
  }
}

export {
  AuthService
}