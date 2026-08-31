import { X } from 'lucide-react';
import type { Seat } from '../types';

interface Props { seats: Seat[]; onRemove: (seat: Seat) => void; }

export default function SelectedSeats({ seats, onRemove }: Props) {
  if (seats.length === 0) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} role="list" aria-label="Selected seats">
      {seats.map(seat => (
        <div key={seat.id} role="listitem" style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: '#1a1a1a', borderRadius: '999px',
          paddingLeft: '12px', paddingRight: '6px', paddingTop: '6px', paddingBottom: '6px',
        }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', letterSpacing: '0.03em' }}>{seat.id}</span>
          <button
            onClick={() => onRemove(seat)}
            aria-label={`Remove seat ${seat.id}`}
            style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 0,
            }}
          >
            <X size={8} strokeWidth={3} color="#fff" />
          </button>
        </div>
      ))}
    </div>
  );
}
