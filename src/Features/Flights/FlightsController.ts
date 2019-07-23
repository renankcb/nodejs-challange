import { Request, Response, Router } from 'express';
import { getRequest } from '../../Api';
import FlightManager from './FlightsManager';

class FlightsController {
  public path = '/flights';
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllFlights);
  }

  async getAllFlights(request: Request, response: Response, next: Function): Promise<Response> {
    try {
      const [resultSource1, resultSource2] = await Promise.all([getRequest('source1'), getRequest('source2')]);

      const allFlights = [...resultSource1.data.flights, ...resultSource2.data.flights];

      const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray(allFlights);

      const flightsSortByDurationTime = FlightManager.sortByDurationTime([...uniqueFlights]);

      const flightsSortByPrice = FlightManager.sortByPrice([...uniqueFlights]);

      const flightsSortByLessStops = FlightManager.sortByLessStops([...uniqueFlights]);

     return response.status(200).json({success: true, results: {flights: flightsSortByDurationTime} });
    } catch (error) {
      next(error) //LOG error
      return response.status(500).json({success: true, result: 'Error retrieving flights' });
    }
  } 

}



export default FlightsController;