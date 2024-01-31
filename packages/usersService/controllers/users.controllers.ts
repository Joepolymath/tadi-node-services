import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../shared/types/controller.types';
import usersService from '../services/users.service';
import HttpException from '../../shared/utils/exceptions/http.exceptions';

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
        status: true,
      });
    });

    this.router.post(`${this.path}`, this.signUp);
  }

  public async signUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = await usersService.signUp(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }
}
