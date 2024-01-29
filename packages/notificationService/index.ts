import express, { Application, Request, Response } from 'express';
import 'colors';
import morgan from 'morgan';

class App {
  app: Application;
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    //  this.initControllers(controllers);
  }

  //   private initControllers(controllers: Controller[]): void {
  //     controllers.forEach(async (controller: Controller) => {
  //       this.app.use('/api/v1', controller.router);
  //     });
  //   }
  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    //  this.app.use(errorHandler);
  }
}

export default App;
