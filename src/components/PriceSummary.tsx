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
    /* Desktop only — hidden on mobile */
    <div className="hidden lg:flex" style={{
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      marginTop: '20px',
      paddingTop: '16px',
      borderTop: '1px solid #f0f0f2',
    }}>
      {/* Chips */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <SelectedSeats seats={selectedSeats} onRemove={onRemoveSeat} />
      </div>

      {/* TOTAL + price + button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2px' }}>
            Total
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0a0a0a', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            ${totalPrice.toLocaleString('en-US')}
          </div>
        </div>

        <button
          onClick={onConfirm}
          disabled={count === 0}
          className="active:scale-95"
          style={{
            height: '44px',
            paddingLeft: '26px',
            paddingRight: '26px',
            borderRadius: '999px',
            border: 'none',
            cursor: count > 0 ? 'pointer' : 'not-allowed',
            fontSize: '13px',
            fontWeight: 700,
            background: count > 0 ? '#c8ff00' : '#f0f0f0',
            color: count > 0 ? '#0a0a0a' : '#9ca3af',
            boxShadow: count > 0 ? '0 4px 18px rgba(200,255,0,0.35)' : 'none',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
          }}
          aria-label={`Confirmar ${count} asiento${count !== 1 ? 's' : ''}`}
        >
          {count > 0 ? `Confirmar (${count})` : 'Confirmar'}
        </button>
      </div>
    </div>
  );
}
