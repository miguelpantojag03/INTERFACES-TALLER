import type { Seat } from '../types';
import SelectedSeats from './SelectedSeats';

interface Props {
  selectedSeats: Seat[];
  totalPrice: number;
  onRemoveSeat: (seat: Seat) => void;
  onConfirm: () => void;
}

export default function PriceSummary({ selectedSeats, totalPrice, onRemoveSeat, onConfirm }: Props) {
  const count = selectedSeats.length;

  return (
    <div className="hidden lg:flex items-center justify-between gap-4 mt-5 pt-4"
         style={{ borderTop: '1px solid #f0f0f0' }}>

      {/* Left: seat chips */}
      <div className="flex-1 min-w-0 flex items-center flex-wrap gap-2">
        <SelectedSeats seats={selectedSeats} onRemove={onRemoveSeat} />
      </div>

      {/* Right: TOTAL + price + button */}
      <div className="flex items-center gap-5 shrink-0">
        <div className="text-right">
          <p className="text-[9px] font-extrabold tracking-[0.2em] text-[#9ca3af] uppercase mb-0.5">
            Total
          </p>
          <p className="text-[1.7rem] font-black text-[#0a0a0a] leading-none tabular-nums">
            ${totalPrice.toLocaleString('en-US')}
          </p>
        </div>

        <button
          onClick={onConfirm}
          disabled={count === 0}
          className="rounded-full text-[13px] font-bold transition-all duration-150 active:scale-95 whitespace-nowrap"
          style={{
            height: '44px',
            paddingLeft: '28px',
            paddingRight: '28px',
            background: count > 0 ? '#c8ff00' : '#f0f0f0',
            color: count > 0 ? '#0a0a0a' : '#9ca3af',
            cursor: count > 0 ? 'pointer' : 'not-allowed',
            boxShadow: count > 0 ? '0 4px 20px rgba(200,255,0,0.3)' : 'none',
          }}
          aria-label={`Confirm ${count} seat${count !== 1 ? 's' : ''}`}
        >
          {count > 0 ? `Confirmar (${count})` : 'Confirmar'}
        </button>
      </div>
    </div>
  );
}
