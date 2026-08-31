import { X } from 'lucide-react';
import type { Seat } from '../types';

interface Props {
  seats: Seat[];
  onRemove: (seat: Seat) => void;
}

export default function SelectedSeats({ seats, onRemove }: Props) {
  if (seats.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label="Selected seats">
      {seats.map(seat => (
        <div
          key={seat.id}
          role="listitem"
          className="flex items-center gap-1.5 rounded-full pl-3 pr-1.5 py-1.5"
          style={{ background: '#1a1a1a' }}
        >
          <span className="text-[11px] font-bold text-white tracking-wide">{seat.id}</span>
          <button
            onClick={() => onRemove(seat)}
            className="w-[14px] h-[14px] rounded-full flex items-center justify-center
                       hover:bg-white/20 transition-colors"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            aria-label={`Remove seat ${seat.id}`}
          >
            <X size={8} strokeWidth={3} className="text-white" />
          </button>
        </div>
      ))}
    </div>
  );
}
