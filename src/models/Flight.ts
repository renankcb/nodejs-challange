import Slice from "./Slice";

export default interface Flight {
  slices: Slice[];
  price: number;
  id: string;
}