import FlightTimes from "./FlightTimes";

export default interface Segment {
  carrier_code: string;  
  carrier_name: string;
  number: string;
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_date_time: FlightTimes;
  arrival_date_time: FlightTimes;
}