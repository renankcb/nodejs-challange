import Flight from '../../models/Flight'
import Slice from '../../models/Slice';
import Segment from '../../models/Segment';

class FlightManager {
  removeDuplicateObjectsFromArray = (array: Flight[]): Flight[] => {
    const keyToCompare = 'id';
  
    array.forEach(flight => {
      var id = '';
      flight.slices.forEach((slice: Slice) => {
        slice.segments.forEach((segment: Segment) => {
          id += `${segment.number + segment.departure_date_time.utc + segment.arrival_date_time.utc}`;
        });
      });
      
      // the idea is create unique ID to each flight based on number and dates
      flight.id = id;
    });
  
    return Array.from(new Map(array.map(i => [(keyToCompare in i) ? i[keyToCompare] : i, i])).values());
  }

  sortByPrice = (flights: Flight[]): Flight[] => {
    return flights.sort((a: Flight, b: Flight) => a.price < b.price ? -1 : 1);
  }

  sortByDurationTime = (flights: Flight[]): Flight[] => {
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    return flights.sort((a: Flight, b: Flight) => a.slices.map(s => s.duration).reduce(reducer) < b.slices.map(s => s.duration).reduce(reducer) ? -1 : 1);
  }

  sortByLessStops = (flights: Flight[]): Flight[] => {
    return flights.sort((a: Flight, b: Flight) => a.slices.length < b.slices.length ? -1 : 1);
  }
}

export default new FlightManager();

