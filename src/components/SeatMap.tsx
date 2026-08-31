import type { Seat as SeatType, SectionData } from '../types';
import Seat from './Seat';

interface SeatMapProps {
  section: SectionData;
  onToggleSeat: (seat: SeatType) => void;
}

const COLUMNS_LEFT = ['A', 'B', 'C'];
const COLUMNS_RIGHT = ['D', 'E', 'F'];

export default function SeatMap({ section, onToggleSeat }: SeatMapProps) {
  // Group seats by row
  const rows = Array.from(new Set(section.seats.map((s) => s.row))).sort(
    (a, b) => a - b
  );

  const getSeat = (row: number, col: string) =>
    section.seats.find((s) => s.row === row && s.column === col);

  return (
    <div className="w-full overflow-x-auto">
      {/* Header: section info */}
      <div className="flex items-start justify-between mb-4 px-1">
        <div>
          <h3 className="text-sm font-bold text-gray-900">{section.name}</h3>
        </div>
        <div className="text-right shrink-0 ml-4">
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
            {section.freeSeats} available · ${section.price} / seat
          </span>
        </div>
      </div>

      {/* Column labels */}
      <div className="flex items-center gap-1 mb-1 pl-8 lg:pl-10" aria-hidden="true">
        {/* Left cols */}
        <div className="flex gap-1">
          {COLUMNS_LEFT.map((col) => (
            <div
              key={col}
              className="w-8 sm:w-9 lg:w-8 text-center text-[10px] font-semibold text-gray-400"
            >
              {col}
            </div>
          ))}
        </div>
        {/* Aisle spacer */}
        <div className="w-6 sm:w-8 lg:w-8" />
        {/* Right cols */}
        <div className="flex gap-1">
          {COLUMNS_RIGHT.map((col) => (
            <div
              key={col}
              className="w-8 sm:w-9 lg:w-8 text-center text-[10px] font-semibold text-gray-400"
            >
              {col}
            </div>
          ))}
        </div>
      </div>

      {/* Seat rows */}
      <div className="flex flex-col gap-1.5" role="group" aria-label={`${section.name} seat map`}>
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-1">
            {/* Row number */}
            <div className="w-7 lg:w-9 text-right pr-1 text-[10px] font-semibold text-gray-400 shrink-0">
              {row}
            </div>

            {/* Left block: A B C */}
            <div className="flex gap-1">
              {COLUMNS_LEFT.map((col) => {
                const seat = getSeat(row, col);
                return seat ? (
                  <Seat key={seat.id} seat={seat} onToggle={onToggleSeat} />
                ) : (
                  <div key={col} className="w-8 sm:w-9 lg:w-8 h-8 sm:h-9 lg:h-8" />
                );
              })}
            </div>

            {/* Aisle */}
            <div
              className="w-6 sm:w-8 lg:w-8 flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-[9px] text-gray-300 font-medium">{row}</span>
            </div>

            {/* Right block: D E F */}
            <div className="flex gap-1">
              {COLUMNS_RIGHT.map((col) => {
                const seat = getSeat(row, col);
                return seat ? (
                  <Seat key={seat.id} seat={seat} onToggle={onToggleSeat} />
                ) : (
                  <div key={col} className="w-8 sm:w-9 lg:w-8 h-8 sm:h-9 lg:h-8" />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
