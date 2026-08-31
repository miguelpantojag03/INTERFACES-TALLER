import { forwardRef } from 'react';
import { X } from 'lucide-react';
import type { Seat } from '../types';

interface MobileBottomBarProps {
  selectedSeats: Seat[];
  totalPrice: number;
  onRemoveSeat: (seat: Seat) => void;
  onConfirm: () => void;
}

const MobileBottomBar = forwardRef<HTMLDivElement, MobileBottomBarProps>(
  ({ selectedSeats, totalPrice, onRemoveSeat, onConfirm }, ref) => {
    const count = selectedSeats.length;

    return (
      <div
        ref={ref}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-950 rounded-t-3xl px-5 pt-4"
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center mb-3" aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-gray-700" />
        </div>

        {/* Seat chips */}
        {count > 0 && (
          <div
            className="flex flex-wrap gap-1.5 mb-4"
            role="list"
            aria-label="Selected seats"
          >
            {selectedSeats.map((seat) => (
              <div
                key={seat.id}
                role="listitem"
                className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-full pl-3 pr-1.5 py-1 text-xs font-semibold text-gray-100"
              >
                <span>{seat.id}</span>
                <button
                  onClick={() => onRemoveSeat(seat)}
                  className="w-4 h-4 rounded-full flex items-center justify-center bg-gray-600 hover:bg-gray-500 transition-colors ml-0.5 touch-manipulation"
                  aria-label={`Remove seat ${seat.id}`}
                >
                  <X size={9} strokeWidth={3} className="text-gray-300" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Price + confirm row */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              Total
            </p>
            <p className="text-2xl font-bold text-white leading-tight">
              ${totalPrice.toLocaleString('en-US')}
            </p>
          </div>
          <button
            onClick={onConfirm}
            disabled={count === 0}
            className={`
              h-12 px-6 rounded-full text-sm font-bold transition-all duration-200
              active:scale-95 touch-manipulation
              ${
                count > 0
                  ? 'bg-[#c8ff00] text-gray-950 hover:bg-[#b8f000] shadow-lg shadow-[#c8ff00]/20'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
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
);

MobileBottomBar.displayName = 'MobileBottomBar';

export default MobileBottomBar;
