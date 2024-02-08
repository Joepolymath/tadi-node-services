import express, { Application, Request, Response } from 'express';
import 'colors';
import morgan from 'morgan';
import Controller from '../shared/types/controller.types';
import { IRequest } from '../shared/types/req.types';

declare global {
  namespace Express {
    interface Request {
      userIpAddress?: string;
    }
  }
}

class App {
  app: Application;
  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initControllers(controllers);
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach(async (controller: Controller) => {
      this.app.use('/api/v1', controller.router);
    });
  }
  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    // Middleware to extract IP address from incoming request
    this.app.use((req: Request, res, next) => {
      const ipAddress = req.ip || req.socket.remoteAddress;
      req.userIpAddress = ipAddress;
      next();
    });
    //  this.app.use(errorHandler);
  }
}

export default App;
