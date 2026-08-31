import type { Seat as SeatType } from '../types';

interface SeatProps {
  seat: SeatType;
  onToggle: (seat: SeatType) => void;
}

export default function Seat({ seat, onToggle }: SeatProps) {
  const isOccupied = seat.status === 'occupied';
  const isSelected = seat.status === 'selected';

  /* Color tokens matching the reference image exactly */
  const bg = isSelected ? '#6c47ff' : isOccupied ? '#c4c7d0' : '#dfe1e7';
  const textColor = isSelected ? '#fff' : isOccupied ? '#a8aab6' : '#9ca3af';

  return (
    <button
      type="button"
      disabled={isOccupied}
      onClick={() => { if (!isOccupied) onToggle(seat); }}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ') && !isOccupied) {
          e.preventDefault(); onToggle(seat);
        }
      }}
      aria-label={`Seat ${seat.id}, ${isOccupied ? 'unavailable' : isSelected ? 'selected' : 'available'}`}
      aria-pressed={isSelected}
      aria-disabled={isOccupied}
      className="focus-visible:ring-2 focus-visible:ring-[#6c47ff] focus-visible:ring-offset-1 active:scale-90 touch-manipulation"
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '8px',
        background: bg,
        color: textColor,
        fontSize: '8px',
        fontWeight: 700,
        border: isSelected ? '1.5px solid #5535d4' : 'none',
        boxShadow: isSelected ? '0 2px 8px rgba(108,71,255,0.4)' : 'none',
        cursor: isOccupied ? 'not-allowed' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '4px',
        position: 'relative',
        transition: 'transform 0.1s, background 0.1s',
        outline: 'none',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {/* Headrest bar */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)',
        width: '12px', height: '3px', borderRadius: '99px',
        background: isSelected ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.09)',
      }} />
      {seat.id}
    </button>
  );
}
