export type SeatStatus = 'available' | 'occupied' | 'selected';

export interface Seat {
  id: string;
  row: number;
  column: string;
  status: SeatStatus;
  price: number;
}

export interface SectionData {
  id: number;
  label: string;
  name: string;
  price: number;
  freeSeats: number;
  seats: Seat[];
}

export interface FlightInfo {
  origin: string;
  destination: string;
  aircraft: string;
  date: string;
}
