import type { Seat as SeatType } from '../types';

interface SeatProps {
  seat: SeatType;
  onToggle: (seat: SeatType) => void;
}

const statusStyles: Record<SeatType['status'], string> = {
  available:
    'bg-[#e2e5ea] hover:bg-[#d0d4db] text-gray-500 cursor-pointer border border-transparent hover:border-gray-300',
  occupied:
    'bg-[#c8ccd4] text-gray-400 cursor-not-allowed border border-transparent opacity-70',
  selected:
    'bg-[#6c47ff] hover:bg-[#5c39e0] text-white cursor-pointer border border-[#5535d4] shadow-md shadow-[#6c47ff]/30',
};

export default function Seat({ seat, onToggle }: SeatProps) {
  const isOccupied = seat.status === 'occupied';
  const isSelected = seat.status === 'selected';

  const handleClick = () => {
    if (!isOccupied) onToggle(seat);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isOccupied) {
      e.preventDefault();
      onToggle(seat);
    }
  };

  return (
    <button
      type="button"
      disabled={isOccupied}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Seat ${seat.id}, ${seat.status}`}
      aria-pressed={isSelected}
      aria-disabled={isOccupied}
      className={`
        relative flex items-center justify-center
        w-8 h-8 lg:w-8 lg:h-8
        rounded-xl text-[10px] font-bold
        transition-all duration-150 select-none touch-manipulation
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c47ff] focus-visible:ring-offset-1
        active:scale-95
        ${statusStyles[seat.status]}
      `}
    >
      {/* Seat back detail */}
      <span
        className={`absolute top-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full opacity-30 ${
          isSelected ? 'bg-white' : 'bg-gray-600'
        }`}
        aria-hidden="true"
      />
      <span className="mt-1 leading-none">{seat.id}</span>
    </button>
  );
}
