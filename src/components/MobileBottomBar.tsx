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
      <div ref={ref} className="lg:hidden" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: '#111111',
        borderRadius: '22px 22px 0 0',
        padding: '12px 20px',
        paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
          <div style={{ width: '34px', height: '3px', borderRadius: '99px', background: '#2e2e2e' }} aria-hidden="true" />
        </div>

        {/* Chips */}
        {count > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }} role="list" aria-label="Selected seats">
            {selectedSeats.map(seat => (
              <div key={seat.id} role="listitem" style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: '#2a2a2a', border: '1px solid #383838', borderRadius: '999px',
                paddingLeft: '12px', paddingRight: '6px', paddingTop: '6px', paddingBottom: '6px',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{seat.id}</span>
                <button onClick={() => onRemoveSeat(seat)} aria-label={`Remove seat ${seat.id}`} style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                }}>
                  <X size={8} strokeWidth={3} color="#fff" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: '#4b5563', textTransform: 'uppercase', marginBottom: '2px' }}>Total</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              ${totalPrice.toLocaleString('en-US')}
            </div>
          </div>
          <button
            onClick={onConfirm}
            disabled={count === 0}
            className="active:scale-95 touch-manipulation"
            style={{
              height: '52px', paddingLeft: '28px', paddingRight: '28px',
              borderRadius: '999px', border: 'none', cursor: count > 0 ? 'pointer' : 'not-allowed',
              fontSize: '13px', fontWeight: 700,
              background: count > 0 ? '#c8ff00' : '#222',
              color: count > 0 ? '#0a0a0a' : '#4b5563',
              boxShadow: count > 0 ? '0 4px 18px rgba(200,255,0,0.2)' : 'none',
              transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}
            aria-label={`Confirmar ${count} asiento${count !== 1 ? 's' : ''}`}
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
