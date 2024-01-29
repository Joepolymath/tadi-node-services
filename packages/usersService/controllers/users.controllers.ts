import { Request, Response, Router } from 'express';
import Controller from '../../shared/types/controller.types';

export default class UserController implements Controller {
  public path: string = '/users';
  public router: Router = Router();

  constructor() {
    this.loadRoutes();
  }

  private loadRoutes() {
    this.router.get(`${this.path}/health`, (req: Request, res: Response) => {
      res.status(200).json({
        message: 'User service works',
        status: true,
      });
    });
  }
}
