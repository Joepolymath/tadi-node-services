import { BCRYPT_SALT } from '../../shared/configs/env.config';
import HttpException from '../../shared/utils/exceptions/http.exceptions';
import UserRepo from '../dataAccess';
import usersModel from '../models/users.model';
import { IUser } from '../types/user.types';
import bcrypt from '../utils/bcrypt';

class UserService {
  private userRepo = new UserRepo(usersModel);
  constructor() {}

  public async signUp(payload: IUser) {
    const foundUser = await this.userRepo.findOne({
      $or: [{ phone: payload.phone }, { email: payload.email }],
    });
    if (foundUser) {
      return new HttpException(400, 'Phone or Email already exists');
    }

    const salt = await bcrypt.generateSalt(Number(BCRYPT_SALT));
    const hashedPassword = await bcrypt.hashPassword(
      <string>payload.password,
      salt
    );
    payload.password = hashedPassword;

    const userInstance = await this.userRepo.create(payload);
    const savedUser = await this.userRepo.save(userInstance);

    // return responseUtils.buildResponse({ data: savedUser });
  }
}
