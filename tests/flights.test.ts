import FlightManager from '../src/features/flights/FlightsManager';
import { flightsMock, flightsMockStops } from './mock';
import Flight from '../src/models/Flight';

describe('Flights Manager', () => {
    it('should return 10 objects in the arraz with no duplicates', () => {
        const flights: Flight[] = flightsMock;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        expect(uniqueFlights.length).toBe(10)
    });

    it('the last item should be the most expensive', () => {
        const flights: Flight[] = flightsMock;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        const sortByPrice = FlightManager.sortByPrice([...uniqueFlights]);
        expect(sortByPrice[sortByPrice.length-1].price).toBe(148.87)
    });
    it('the first item should be the cheapest', () => {
        const flights: Flight[] = flightsMock;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        const sortByPrice = FlightManager.sortByPrice([...uniqueFlights]);
        expect(sortByPrice[0].price).toBe(117.01)
    });

    it('the first item should have the shortest duration time', () => {
        const flights: Flight[] = flightsMock;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        const sortByDurationTime = FlightManager.sortByDurationTime([...uniqueFlights]);
        expect(sortByDurationTime[0].id).toBe("1442019-08-08T04:30:00.000Z2019-08-08T06:25:00.000Z1452019-08-10T06:50:00.000Z2019-08-10T08:40:00.000Z")
    });
    it('the last item should have the longest duration time', () => {
        const flights: Flight[] = flightsMock;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        const sortByDurationTime = FlightManager.sortByDurationTime([...uniqueFlights]);
        expect(sortByDurationTime[sortByDurationTime.length-1].id).toBe("85432019-08-08T08:00:00.000Z2019-08-08T10:00:00.000Z85442019-08-10T18:00:00.000Z2019-08-10T20:00:00.000Z")
    });

    it('the first item should have 1 stop', () => {
        const flights: Flight[] = flightsMockStops;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        const sortByStops = FlightManager.sortByLessStops([...uniqueFlights]);
        expect(sortByStops[0].slices.length).toBe(1)
    });
    it('the last item should have 3 stops', () => {
        const flights: Flight[] = flightsMockStops;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        const sortByStops = FlightManager.sortByLessStops([...uniqueFlights]);
        expect(sortByStops[sortByStops.length-1].slices.length).toBe(3)
    });
    
});