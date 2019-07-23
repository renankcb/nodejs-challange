import App from './app';
import FlightsController from './Features/Flights/FlightsController';
 
const app = new App(
  [
    new FlightsController(),
  ],
  3000,
);
 
app.listen();