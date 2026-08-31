import { X } from 'lucide-react';
import type { Seat } from '../types';

interface SelectedSeatsProps {
  seats: Seat[];
  onRemove: (seat: Seat) => void;
}

export default function SelectedSeats({ seats, onRemove }: SelectedSeatsProps) {
  if (seats.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic">Ningún asiento seleccionado</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5" role="list" aria-label="Selected seats">
      {seats.map((seat) => (
        <div
          key={seat.id}
          role="listitem"
          className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-full pl-3 pr-1.5 py-1 text-xs font-semibold text-gray-800 group transition-all"
        >
          <span>{seat.id}</span>
          <button
            onClick={() => onRemove(seat)}
            className="w-4 h-4 rounded-full flex items-center justify-center bg-gray-300 group-hover:bg-gray-400 transition-colors ml-0.5"
            aria-label={`Remove seat ${seat.id}`}
          >
            <X size={9} strokeWidth={3} className="text-gray-700" />
          </button>
        </div>
      ))}
    </div>
  );
}
