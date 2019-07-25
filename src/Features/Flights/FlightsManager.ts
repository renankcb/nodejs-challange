import Flight from '../../models/Flight'
import Slice from '../../models/Slice';
import Segment from '../../models/Segment';

class FlightManager {
  removeDuplicateObjectsFromArray(array: Flight[]): Flight[] {
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

    return Array.from(new Map(array.map(i => [i.id, i])).values());
  }

  private sortByPrice(flights: Flight[]): Flight[] {
    return flights.sort((a: Flight, b: Flight) => a.price < b.price ? -1 : 1);
  }

  private sortByDurationTime(flights: Flight[]): Flight[] {
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    return flights.sort((a: Flight, b: Flight) => a.slices.map(s => s.duration).reduce(reducer) < b.slices.map(s => s.duration).reduce(reducer) ? -1 : 1);
  }

  private sortByLessStops(flights: Flight[]): Flight[] {
    return flights.sort((a: Flight, b: Flight) => a.slices.length < b.slices.length ? -1 : 1);
  }

  ranking(array: Flight[]): Flight[] {
    const flights = this.removeDuplicateObjectsFromArray([...array]);

    const sum = (accumulator: number, currentValue: number) => accumulator + currentValue;

    const rank = flights.sort((a: Flight, b: Flight) => {

      const durationTimeA = a.slices.map(s => s.duration).reduce(sum);
      const durationTimeB = b.slices.map(s => s.duration).reduce(sum)

      if (a.slices.length < b.slices.length || a.price < b.price || durationTimeA < durationTimeB) return -1;

      if (a.slices.length > b.slices.length || a.price > b.price || durationTimeA > durationTimeB) return 1;
    });

    return rank;
  }

  sortBy(array: Flight[], sortBy: string) {
    const flights = this.removeDuplicateObjectsFromArray([...array]);

    if (sortBy === 'price') {
      return this.sortByPrice([...flights]);
    } else if (sortBy === 'durationTime') {
      return this.sortByDurationTime([...flights]);
    } else if (sortBy === 'stops') {
      return this.sortByLessStops([...flights]);
    } else {
      return flights;
    }
  }
}

export default new FlightManager();

