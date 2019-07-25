import { IController } from './../../IController';
import { Request, Response, Router } from 'express';
import Api from '../../Api';
import FlightManager from './FlightsManager';
import Flight from '../../models/Flight';

class FlightsController implements IController {
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
      let result: Flight[];
      const sortBy = request.query['sortBy'];

      const [resultSource1, resultSource2] = await Promise.all([Api.getRequest('source1'), Api.getRequest('source2')]);

      const source1 = resultSource1 !== null ? [...resultSource1.data.flights] : [];
      const source2 = resultSource2 !== null ? [...resultSource2.data.flights] : [];

      const allFlights = [...source1, ...source2];

      if (sortBy) {
        result = FlightManager.sortBy([...allFlights], sortBy);
      } else {
        result = FlightManager.ranking([...allFlights]);
      }

     return response.status(200).json({success: true, results: {flights: result} });
    } catch (error) {
      next(error) //LOG error
      return response.status(500).json({success: false, result: 'Error retrieving flights' });
    }
  } 

}

export default FlightsController;