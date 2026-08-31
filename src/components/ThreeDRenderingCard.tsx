import { ArrowUpRight } from 'lucide-react';

export default function ThreeDRenderingCard() {
  return (
    <div
      className="relative flex flex-col bg-[#111111] rounded-3xl p-5 overflow-hidden"
      style={{ minHeight: '320px' }}
    >
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 16px)',
        }}
      />

      {/* Subtle purple glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: '-40px', left: '-40px',
          width: '180px', height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(108,71,255,0.18) 0%,transparent 70%)',
        }}
      />

      {/* Top row: icon + arrow */}
      <div className="relative z-10 flex items-start justify-between">
        {/* Lime yellow icon badge */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: '#c8ff00' }}
        >
          {/* 3×4 seat-grid SVG icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {[0,1,2].map(col =>
              [0,1,2,3].map(row => (
                <rect
                  key={`${col}-${row}`}
                  x={col * 8 + 0}
                  y={row * 6 + 0}
                  width="6"
                  height="4"
                  rx="1.5"
                  fill="#111"
                />
              ))
            )}
          </svg>
        </div>

        {/* Arrow button */}
        <button
          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center
                     hover:bg-white/20 transition-colors"
          aria-label="Open 3D cabin view"
        >
          <ArrowUpRight size={13} strokeWidth={2.5} className="text-white" />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom text */}
      <div className="relative z-10">
        <h3 className="text-[1.15rem] font-bold text-white leading-snug mb-2">
          3D Rendering
        </h3>
        <p className="text-[0.75rem] text-[#6b7280] leading-relaxed">
          Recorre la cabina de tu avión con visualización 3D y siente lo que te espera a bordo.
        </p>
      </div>
    </div>
  );
}
