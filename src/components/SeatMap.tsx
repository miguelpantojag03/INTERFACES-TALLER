import type { Seat as SeatType, SectionData } from '../types';
import Seat from './Seat';

interface SeatMapProps {
  section: SectionData;
  onToggleSeat: (seat: SeatType) => void;
}

const COLS_LEFT  = ['A', 'B', 'C'];
const COLS_RIGHT = ['D', 'E', 'F'];
const GAP = 4;    // px between seats
const SEAT_W = 30; // px seat width

export default function SeatMap({ section, onToggleSeat }: SeatMapProps) {
  const rows = Array.from(new Set(section.seats.map(s => s.row))).sort((a, b) => a - b);
  const getSeat = (row: number, col: string) =>
    section.seats.find(s => s.row === row && s.column === col);

  return (
    <div style={{ width: '100%' }}>

      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>
          {section.name}
        </span>
        <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500, whiteSpace: 'nowrap' }}>
          {section.freeSeats} libres &nbsp;·&nbsp; ${section.price} / asiento
        </span>
      </div>

      {/* Column labels */}
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '22px', marginBottom: '6px' }} aria-hidden="true">
        {COLS_LEFT.map((col, i) => (
          <div key={col} style={{ width: `${SEAT_W}px`, marginRight: i < COLS_LEFT.length - 1 ? `${GAP}px` : 0, textAlign: 'center', fontSize: '10px', fontWeight: 600, color: '#9ca3af' }}>
            {col}
          </div>
        ))}
        {/* Aisle gap */}
        <div style={{ width: '20px' }} />
        {COLS_RIGHT.map((col, i) => (
          <div key={col} style={{ width: `${SEAT_W}px`, marginRight: i < COLS_RIGHT.length - 1 ? `${GAP}px` : 0, textAlign: 'center', fontSize: '10px', fontWeight: 600, color: '#9ca3af' }}>
            {col}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}
        role="group"
        aria-label={`${section.name} seat map`}
      >
        {rows.map(row => (
          <div key={row} style={{ display: 'flex', alignItems: 'center' }}>
            {/* Row number */}
            <div style={{ width: '18px', fontSize: '9px', fontWeight: 600, color: '#9ca3af', textAlign: 'right', paddingRight: '4px', flexShrink: 0 }}>
              {row}
            </div>

            {/* A B C */}
            <div style={{ display: 'flex', gap: `${GAP}px` }}>
              {COLS_LEFT.map(col => {
                const s = getSeat(row, col);
                return s ? <Seat key={s.id} seat={s} onToggle={onToggleSeat} />
                         : <div key={col} style={{ width: `${SEAT_W}px`, height: `${SEAT_W}px` }} />;
              })}
            </div>

            {/* Aisle */}
            <div style={{ width: '20px', flexShrink: 0 }} aria-hidden="true" />

            {/* D E F */}
            <div style={{ display: 'flex', gap: `${GAP}px` }}>
              {COLS_RIGHT.map(col => {
                const s = getSeat(row, col);
                return s ? <Seat key={s.id} seat={s} onToggle={onToggleSeat} />
                         : <div key={col} style={{ width: `${SEAT_W}px`, height: `${SEAT_W}px` }} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
