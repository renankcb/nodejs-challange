import App from './app';
import FlightsController from './FlightsController';
 
const app = new App(
  [
    new FlightsController(),
  ],
  3000,
);
 
app.listen();