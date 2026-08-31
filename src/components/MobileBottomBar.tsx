import { forwardRef } from 'react';
import { X } from 'lucide-react';
import type { Seat } from '../types';

interface Props {
  selectedSeats: Seat[];
  totalPrice: number;
  onRemoveSeat: (seat: Seat) => void;
  onConfirm: () => void;
}

const MobileBottomBar = forwardRef<HTMLDivElement, Props>(
  ({ selectedSeats, totalPrice, onRemoveSeat, onConfirm }, ref) => {
    const count = selectedSeats.length;

    return (
      <div
        ref={ref}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: '#111111',
          borderRadius: '24px 24px 0 0',
          padding: '14px 20px',
          paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center mb-3" aria-hidden="true">
          <div style={{ width: '36px', height: '3px', borderRadius: '99px', background: '#2e2e2e' }} />
        </div>

        {/* Chips */}
        {count > 0 && (
          <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Selected seats">
            {selectedSeats.map(seat => (
              <div
                key={seat.id}
                role="listitem"
                className="flex items-center gap-1.5 rounded-full pl-3 pr-1.5 py-1.5"
                style={{ background: '#2a2a2a', border: '1px solid #383838' }}
              >
                <span className="text-[11px] font-bold text-white tracking-wide">{seat.id}</span>
                <button
                  onClick={() => onRemoveSeat(seat)}
                  className="w-[14px] h-[14px] rounded-full flex items-center justify-center touch-manipulation"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                  aria-label={`Remove seat ${seat.id}`}
                >
                  <X size={8} strokeWidth={3} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Price + confirm */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[9px] font-extrabold tracking-[0.2em] uppercase mb-0.5"
               style={{ color: '#4b5563' }}>
              Total
            </p>
            <p className="text-[1.75rem] font-black text-white leading-none tabular-nums">
              ${totalPrice.toLocaleString('en-US')}
            </p>
          </div>

          <button
            onClick={onConfirm}
            disabled={count === 0}
            className="rounded-full text-[13px] font-bold transition-all duration-150 active:scale-95 touch-manipulation whitespace-nowrap"
            style={{
              height: '52px',
              paddingLeft: '28px',
              paddingRight: '28px',
              background: count > 0 ? '#c8ff00' : '#222',
              color: count > 0 ? '#0a0a0a' : '#4b5563',
              cursor: count > 0 ? 'pointer' : 'not-allowed',
              boxShadow: count > 0 ? '0 4px 20px rgba(200,255,0,0.2)' : 'none',
            }}
            aria-label={`Confirm ${count} seat${count !== 1 ? 's' : ''}`}
          >
            {count > 0 ? `Confirmar (${count})` : 'Confirmar'}
          </button>
        </div>
      </div>
    );
  }
);

MobileBottomBar.displayName = 'MobileBottomBar';
export default MobileBottomBar;
