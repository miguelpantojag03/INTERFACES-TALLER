import type { Seat as SeatType } from '../types';

interface SeatProps {
  seat: SeatType;
  onToggle: (seat: SeatType) => void;
}

/* Exact colors from image */
const AVAILABLE = { bg: '#e2e5ec', text: '#9ca3af' };
const OCCUPIED  = { bg: '#c8cbd4', text: '#b0b3bc' };
const SELECTED  = { bg: '#6c47ff', text: '#ffffff' };

export default function Seat({ seat, onToggle }: SeatProps) {
  const isOccupied = seat.status === 'occupied';
  const isSelected = seat.status === 'selected';
  const c = isSelected ? SELECTED : isOccupied ? OCCUPIED : AVAILABLE;

  return (
    <button
      type="button"
      disabled={isOccupied}
      onClick={() => { if (!isOccupied) onToggle(seat); }}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ') && !isOccupied) {
          e.preventDefault();
          onToggle(seat);
        }
      }}
      aria-label={`Seat ${seat.id}, ${isOccupied ? 'unavailable' : isSelected ? 'selected' : 'available'}`}
      aria-pressed={isSelected}
      aria-disabled={isOccupied}
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '8px',
        background: c.bg,
        color: c.text,
        fontSize: '8px',
        fontWeight: 700,
        border: isSelected ? '1.5px solid #5535d4' : 'none',
        boxShadow: isSelected ? '0 2px 8px rgba(108,71,255,0.35)' : 'none',
        cursor: isOccupied ? 'not-allowed' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '4px',
        position: 'relative',
        transition: 'all 0.12s',
        outline: 'none',
        flexShrink: 0,
        userSelect: 'none',
      }}
      className="focus-visible:ring-2 focus-visible:ring-[#6c47ff] focus-visible:ring-offset-1 active:scale-90 touch-manipulation"
    >
      {/* Headrest notch at top */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '5px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '12px',
          height: '3px',
          borderRadius: '99px',
          background: isSelected ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.08)',
        }}
      />
      {seat.id}
    </button>
  );
}
