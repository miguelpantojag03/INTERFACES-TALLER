import type { Seat as SeatType, SectionData } from '../types';
import Seat from './Seat';

interface SeatMapProps {
  section: SectionData;
  onToggleSeat: (seat: SeatType) => void;
}

const COLS_LEFT  = ['A', 'B', 'C'];
const COLS_RIGHT = ['D', 'E', 'F'];

export default function SeatMap({ section, onToggleSeat }: SeatMapProps) {
  const rows = Array.from(new Set(section.seats.map(s => s.row))).sort((a, b) => a - b);
  const getSeat = (row: number, col: string) =>
    section.seats.find(s => s.row === row && s.column === col);

  return (
    <div className="w-full">
      {/* Section info header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[13px] font-bold text-[#111]">{section.name}</span>
        <span className="text-[11px] text-[#9ca3af] font-medium whitespace-nowrap">
          {section.freeSeats} libres &nbsp;·&nbsp; ${section.price} / asiento
        </span>
      </div>

      {/* Column labels */}
      <div className="flex items-center mb-1.5" style={{ paddingLeft: '24px' }} aria-hidden="true">
        {/* Left group A B C */}
        {COLS_LEFT.map(col => (
          <div key={col} style={{ width: '30px', marginRight: '4px' }}
               className="text-center text-[10px] font-semibold text-[#9ca3af]">
            {col}
          </div>
        ))}
        {/* Aisle gap */}
        <div style={{ width: '24px' }} />
        {/* Right group D E F */}
        {COLS_RIGHT.map(col => (
          <div key={col} style={{ width: '30px', marginRight: '4px' }}
               className="text-center text-[10px] font-semibold text-[#9ca3af]">
            {col}
          </div>
        ))}
      </div>

      {/* Seat grid */}
      <div
        className="flex flex-col"
        style={{ gap: '4px' }}
        role="group"
        aria-label={`${section.name} seat map`}
      >
        {rows.map(row => (
          <div key={row} className="flex items-center">
            {/* Row number */}
            <div
              className="text-right text-[10px] font-semibold text-[#9ca3af] shrink-0"
              style={{ width: '20px', paddingRight: '4px' }}
            >
              {row}
            </div>

            {/* A B C */}
            <div className="flex" style={{ gap: '4px' }}>
              {COLS_LEFT.map(col => {
                const seat = getSeat(row, col);
                return seat
                  ? <Seat key={seat.id} seat={seat} onToggle={onToggleSeat} />
                  : <div key={col} style={{ width: '30px', height: '30px' }} />;
              })}
            </div>

            {/* Aisle */}
            <div style={{ width: '24px' }} aria-hidden="true" />

            {/* D E F */}
            <div className="flex" style={{ gap: '4px' }}>
              {COLS_RIGHT.map(col => {
                const seat = getSeat(row, col);
                return seat
                  ? <Seat key={seat.id} seat={seat} onToggle={onToggleSeat} />
                  : <div key={col} style={{ width: '30px', height: '30px' }} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
