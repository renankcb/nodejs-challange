import express from 'express';
import bodyParser from 'body-parser';
import { IController } from './IController';
 
class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: Array<IController>, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers: Array<IController>): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;