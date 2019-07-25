import FlightManager from '../src/features/flights/FlightsManager';
import { flightsMock, flightsMockStops } from './mock';
import Flight from '../src/models/Flight';

describe('Flights Manager', () => {
    it('should return 10 objects in the arraz with no duplicates', () => {
        const flights: Flight[] = flightsMock;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        expect(uniqueFlights.length).toBe(10)
    });

    it('rank result', () => {
        const flights: Flight[] = flightsMock;
        const uniqueFlights = FlightManager.ranking([...flights]);
        expect(uniqueFlights[0].price).toBe(129)
    });

    it('should return all results without duplicates when there is no sortBy param', () => {
        const flights: Flight[] = flightsMock;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        const result = FlightManager.sortBy([...uniqueFlights], undefined);
        expect(result.length).toBe(10);
    });

    it('should return all results without duplicates sortBy price', () => {
        const flights: Flight[] = flightsMock;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        const result = FlightManager.sortBy([...uniqueFlights], 'price');
        expect(result[0].price).toBe(117.01)
    });

    it('should return all results without duplicates sortBy less stops', () => {
        const flights: Flight[] = flightsMockStops;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        const result = FlightManager.sortBy([...uniqueFlights], 'stops');
        expect(result[0].slices.length).toBe(1)
    });

    it('should return all results without duplicates sortBy duration time', () => {
        const flights: Flight[] = flightsMock;
        const uniqueFlights = FlightManager.removeDuplicateObjectsFromArray([...flights]);
        const restult = FlightManager.sortBy([...uniqueFlights], 'durationTime');
        expect(restult[0].id).toBe("1442019-08-08T04:30:00.000Z2019-08-08T06:25:00.000Z1452019-08-10T06:50:00.000Z2019-08-10T08:40:00.000Z")
    });
    
});