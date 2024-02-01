import { BCRYPT_SALT } from '../../shared/configs/env.config';
import HttpException from '../../shared/utils/exceptions/http.exceptions';
import responseUtils from '../../shared/utils/response.utils';
import UserRepo from '../dataAccess';
import usersModel from '../models/users.model';
import { IGetUsers, ILogin, IUser } from '../types/user.types';
import { generateToken } from '../utils/authTokens.utils';
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

    return responseUtils.buildResponse({ data: savedUser });
  }

  public async signIn(payload: ILogin) {
    const foundUser = await this.userRepo.findOne({
      $or: [{ phone: payload.phone }, { email: payload.email }],
    });
    if (!foundUser) {
      return new HttpException(404, 'User not Found');
    }

    const passwordFound = await bcrypt.compare(
      payload.password,
      <string>foundUser.password
    );
    if (!passwordFound) {
      return new HttpException(400, 'Password Incorrect!');
    }
    if (!passwordFound) {
      return new HttpException(400, 'Password Incorrect!');
    }

    return responseUtils.buildResponse({
      message: 'Login Successful',
      data: {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        phone: foundUser.phone,
        accessToken: generateToken(
          foundUser._id,
          foundUser.email,
          <string>foundUser.role
        ),
      },
    });
  }

  public async getAll(query: IGetUsers) {
    const pagination = {
      skip: query.skip,
      limit: query.limit,
    };
    delete query.limit;
    delete query.skip;

    const queryData = {
      filter: query,
      skip: pagination.skip || 0,
      limit: pagination.limit || 0,
    };
    const foundUsers: IUser[] = await this.userRepo.findAll(queryData);
    const totalUsers = await this.userRepo.countDocs(queryData.filter);
    return responseUtils.buildResponse({
      data: foundUsers,
      count: totalUsers,
      skip: queryData.skip,
      limit: queryData.limit,
    });
  }

  public async getOne(query: IGetUsers) {
    const foundUser = await this.userRepo.findOne(query);
    if (!foundUser) {
      return new HttpException(404, 'User not found');
    }

    return responseUtils.buildResponse({
      data: foundUser,
    });
  }
}

export default new UserService();
