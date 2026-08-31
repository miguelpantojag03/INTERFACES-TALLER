import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
}

export default function Header({ onBack }: HeaderProps) {
  return (
    <>
      {/* ── DESKTOP ── */}
      <div className="hidden lg:flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[2.5rem] font-black text-[#0a0a0a] tracking-tight leading-none">
            Choose Seats
          </h1>
          <p className="mt-2 text-[0.75rem] font-medium text-[#9ca3af] tracking-[0.05em] uppercase">
            BOG → MDE &nbsp;·&nbsp; A320NEO &nbsp;·&nbsp; 12 SEP
          </p>
        </div>

        <div className="flex items-center gap-3 mt-1">
          {/* Check-in pill */}
          <div className="flex items-center gap-2 border border-[#e5e7eb] rounded-full px-3.5 py-[7px] bg-white shadow-sm">
            <span className="w-[7px] h-[7px] rounded-full bg-green-400 shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-semibold text-[#374151] whitespace-nowrap">
              Check-in abierto
            </span>
          </div>

          {/* Avatar */}
          <div
            className="w-[38px] h-[38px] rounded-full bg-[#c8a87a] flex items-center justify-center
                       text-[13px] font-bold text-[#3b1f00] select-none
                       outline outline-[2.5px] outline-[#0a0a0a] outline-offset-0"
            aria-label="User JR"
          >
            JR
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden flex items-center justify-between px-4 pt-5 pb-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center
                     justify-center shadow-sm active:scale-95 transition-transform touch-manipulation"
          aria-label="Go back"
        >
          <ArrowLeft size={15} className="text-gray-700" strokeWidth={2.5} />
        </button>

        <div className="text-center">
          <h1 className="text-[15px] font-black text-[#0a0a0a] tracking-tight">Choose Seats</h1>
          <p className="text-[11px] text-gray-400 font-medium mt-0.5">BOG → MDE · 12 SEP</p>
        </div>

        <div
          className="w-9 h-9 rounded-full bg-[#c8a87a] flex items-center justify-center
                     text-[13px] font-bold text-[#3b1f00] select-none
                     outline outline-2 outline-[#0a0a0a]"
          aria-label="User JR"
        >
          JR
        </div>
      </div>
    </>
  );
}
