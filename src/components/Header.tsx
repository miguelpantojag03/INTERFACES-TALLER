import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
}

export default function Header({ onBack }: HeaderProps) {
  return (
    <>
      {/* Desktop header */}
      <div className="hidden lg:flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-950 tracking-tight leading-none">
            Choose Seats
          </h1>
          <p className="mt-1.5 text-sm text-gray-400 font-medium tracking-wide">
            BOG → MDE &nbsp;·&nbsp; A320NEO &nbsp;·&nbsp; 12 SEP
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-3 py-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold text-gray-700">Check-in open</span>
          </div>
          <div
            className="w-9 h-9 rounded-full bg-amber-200 flex items-center justify-center text-sm font-bold text-amber-900 border-2 border-gray-950 select-none"
            aria-label="User: JR"
          >
            JR
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          aria-label="Go back"
        >
          <ArrowLeft size={16} className="text-gray-700" />
        </button>
        <div className="text-center">
          <h1 className="text-base font-bold text-gray-950 tracking-tight">Choose Seats</h1>
          <p className="text-xs text-gray-400 font-medium">BOG → MDE · 12 SEP</p>
        </div>
        <div
          className="w-9 h-9 rounded-full bg-amber-200 flex items-center justify-center text-sm font-bold text-amber-900 border-2 border-gray-950 select-none"
          aria-label="User: JR"
        >
          JR
        </div>
      </div>
    </>
  );
}
