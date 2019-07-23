import Segment from "./Segment";

export default interface Slice {
  duration: number;
  segments: Segment[];
}