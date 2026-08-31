import type { SectionData, Seat } from '../types';

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Helper to generate seats for a section
function generateSeats(
  rows: number[],
  price: number,
  occupied: string[],
  preSelected: string[] = []
): Seat[] {
  const seats: Seat[] = [];
  for (const row of rows) {
    for (const col of COLUMNS) {
      const id = `${row}${col}`;
      let status: Seat['status'] = 'available';
      if (occupied.includes(id)) status = 'occupied';
      if (preSelected.includes(id)) status = 'selected';
      seats.push({ id, row, column: col, status, price });
    }
  }
  return seats;
}

// Section 1 – Business Class (rows 1-8)
const section1Occupied = [
  '1E', '1F',
  '2D', '2E', '2F',
  '3D', '3E', '3F',
  '4E', '4F',
  '5B', '5C', '5D', '5E', '5F',
  '6C', '6D', '6F',
  '7B', '7C', '7D', '7E',
  '8A', '8B', '8D', '8E', '8F',
];
const section1PreSelected = ['1A', '2A', '3A', '4A'];

// Section 2 – Premium Economy (rows 9-16)
const section2Occupied = [
  '9E', '9F',
  '10A', '10B', '10C',
  '11D', '11E', '11F',
  '12A', '12B',
  '13C', '13D', '13E',
  '14F',
  '15A', '15B', '15C',
  '16D', '16E', '16F',
];
const section2PreSelected = ['9A', '9B', '9C', '9D'];

// Section 3 – Economy (rows 17-28)
const section3Occupied = [
  '17A', '17B',
  '18C', '18D', '18E',
  '19F',
  '20A', '20B', '20C',
  '21D', '21E',
  '22A', '22B', '22F',
  '23C', '23D',
  '24E', '24F',
  '25A', '25B', '25C',
  '26D', '26E', '26F',
  '27A', '27B',
  '28C', '28D', '28E', '28F',
];

export const sectionsData: SectionData[] = [
  {
    id: 1,
    label: '1',
    name: 'Section 1 (Business Class)',
    price: 480,
    freeSeats: 35,
    seats: generateSeats(
      [1, 2, 3, 4, 5, 6, 7, 8],
      480,
      section1Occupied,
      section1PreSelected
    ),
  },
  {
    id: 2,
    label: '2',
    name: 'Premium · Sec 2',
    price: 260,
    freeSeats: 44,
    seats: generateSeats(
      [9, 10, 11, 12, 13, 14, 15, 16],
      260,
      section2Occupied,
      section2PreSelected
    ),
  },
  {
    id: 3,
    label: '3',
    name: 'Section 3 (Economy)',
    price: 120,
    freeSeats: 52,
    seats: generateSeats(
      [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
      120,
      section3Occupied
    ),
  },
];

export const flightInfo = {
  origin: 'BOG',
  destination: 'MDE',
  aircraft: 'A320NEO',
  date: '12 SEP',
};
