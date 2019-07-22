import { Request, Response, Router } from 'express';
import * as api from './Api';
import * as util from './Util';

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
      const resultSource1 = await api.getRequest('source1');
      const resultSource2 = await api.getRequest('source2');

      const allFlights = [...resultSource1.data.flights, ...resultSource2.data.flights];

      allFlights.forEach(flight => {
        var id = '';
        flight.slices.forEach((slice: any) => {
          slice.segments.forEach((segment: any) => {
            id += `${segment.number + segment.departure_date_time.utc + segment.arrival_date_time.utc}`;
          });
        });
        flight['id'] = id;
      })

      const uniqueFlights = util.removeDuplicateObjectsFromArray(allFlights, 'id');

     return response.status(200).json({success: true, results: {uniqueFlights} });
    } catch (error) {
      next(error)
      return response.status(500).json({success: true, result: 'Error retrieving flights' });
    }
  } 

}



export default FlightsController;