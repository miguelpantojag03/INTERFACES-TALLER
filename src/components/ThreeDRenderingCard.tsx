import { ArrowUpRight, LayoutGrid } from 'lucide-react';

export default function ThreeDRenderingCard() {
  return (
    <div className="relative flex flex-col justify-between bg-gray-950 rounded-3xl p-5 overflow-hidden h-full min-h-[260px] lg:min-h-[320px]">
      {/* Top row: icon + arrow */}
      <div className="flex items-start justify-between">
        {/* Green icon badge */}
        <div className="w-11 h-11 rounded-2xl bg-[#c8ff00] flex items-center justify-center shadow-lg shadow-[#c8ff00]/30">
          <LayoutGrid size={20} className="text-gray-950" strokeWidth={2.5} />
        </div>
        {/* Arrow button */}
        <button
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Open 3D view"
        >
          <ArrowUpRight size={14} className="text-white" />
        </button>
      </div>

      {/* Decorative background lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px)',
          }}
        />
        {/* Glow */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#6c47ff]/20 blur-3xl" />
      </div>

      {/* Bottom text */}
      <div className="relative z-10 mt-auto">
        <h3 className="text-xl font-bold text-white leading-tight mb-2">
          3D Rendering
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          Explore your aircraft cabin with 3D visualization and feel what awaits you on board.
        </p>
      </div>
    </div>
  );
}
