import App from './app';
import FlightsController from './features/flights/FlightsController';
 
const app = new App(
  [
    new FlightsController(),
  ],
  3000,
);
 
app.listen();