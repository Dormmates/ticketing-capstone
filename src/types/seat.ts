export type SeatStatus = "reserved" | "vip" | "available" | "sold" | "complimentarySeat";

export interface Seat {
  seatNumber: string;
  x: number;
  y: number;
  row?: string;
  section?: string;
  status?: SeatStatus;
  ticketControlNumber?: number;
  ticketPrice?: number;
}

export interface Row {
  [row: string]: Seat[];
}

export interface SeatMap {
  [section: string]: Row;
}

export interface FlattenedSeat {
  seatNumber: string;
  x: number;
  y: number;
  row: string;
  section: string;
  status: SeatStatus;
  ticketControlNumber: number;
  ticketPrice: number;
}

export type FlattenedSeatMap = FlattenedSeat[];
