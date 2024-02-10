import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../shared/types/controller.types';
import usersService from '../services/users.service';
import HttpException from '../../shared/utils/exceptions/http.exceptions';
import { IGetUsers } from '../types/user.types';
import { getToken } from '../utils/getToken';
import { verifyApiKey } from '../middlewares/apiKey';

export default class UserController implements Controller {
  public path: string = '/users';
  public router: Router = Router();

  constructor() {
    this.loadRoutes();
  }

  private loadRoutes() {
    // health check
    this.router.get(`${this.path}/health`, (req: Request, res: Response) => {
      res.status(200).json({
        message: 'User service works',
        status: 'success',
      });
    });

    this.router.post(`${this.path}`, this.signUp);
    this.router.post(`${this.path}/signin`, this.signIn);
    this.router.get(`${this.path}`, this.getAll);
    this.router.get(`${this.path}/getOne`, this.getOne);
    this.router.get(
      `${this.path}/auth-check`,
      verifyApiKey,
      this.authenticateService
    );
  }

  public async signUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      req.body.knownIps = [req.userIpAddress];
      const data = await usersService.signUp(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  public async signIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      req.body.ip = req.userIpAddress;
      const data = await usersService.signIn(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  public async getAll(
    req: Request<{}, {}, {}, IGetUsers>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = await usersService.getAll(req.query);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  public async getOne(
    req: Request<{}, {}, {}, IGetUsers>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = await usersService.getOne(req.query);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  public async authenticateService(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = getToken(req.headers.authorization as string);
      console.log({ token });
      if (!token) {
        return res.status(403).json({
          messsage: 'Please provide authorization token',
          status: 'failure',
        });
      }
      const data = await usersService.authenticate(token);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error?.message,
        status: 'failure',
      });
    }
  }
}
