import type { Seat } from '../types';
import SelectedSeats from './SelectedSeats';

interface PriceSummaryProps {
  selectedSeats: Seat[];
  totalPrice: number;
  onRemoveSeat: (seat: Seat) => void;
  onConfirm: () => void;
}

export default function PriceSummary({
  selectedSeats,
  totalPrice,
  onRemoveSeat,
  onConfirm,
}: PriceSummaryProps) {
  const count = selectedSeats.length;

  return (
    /* Desktop bottom bar – hidden on mobile (mobile uses MobileBottomBar) */
    <div className="hidden lg:flex items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
      {/* Left: chips */}
      <div className="flex-1 min-w-0">
        <SelectedSeats seats={selectedSeats} onRemove={onRemoveSeat} />
      </div>

      {/* Right: total + button */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Total</p>
          <p className="text-2xl font-bold text-gray-950 leading-tight">
            ${totalPrice.toLocaleString('en-US')}
          </p>
        </div>
        <button
          onClick={onConfirm}
          disabled={count === 0}
          className={`
            h-11 px-6 rounded-full text-sm font-bold transition-all duration-200 active:scale-95
            ${
              count > 0
                ? 'bg-[#c8ff00] text-gray-950 hover:bg-[#b8f000] shadow-lg shadow-[#c8ff00]/30'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
          aria-label={`Confirm ${count} seat${count !== 1 ? 's' : ''}`}
        >
          {count > 0 ? `Confirm (${count})` : 'Confirm'}
        </button>
      </div>
    </div>
  );
}
