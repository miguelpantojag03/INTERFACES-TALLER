import { ArrowUpRight } from 'lucide-react';

export default function ThreeDRenderingCard() {
  return (
    <div className="stripe-bg-dark" style={{
      position: 'relative',
      background: '#111111',
      borderRadius: '20px',
      padding: '18px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      minHeight: '340px',
    }}>
      {/* Purple glow bottom-left */}
      <div style={{
        position: 'absolute', bottom: '-30px', left: '-30px',
        width: '160px', height: '160px', borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(108,71,255,0.2) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        {/* Lime badge with seat-grid SVG */}
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: '#c8ff00',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            {/* 3 columns × 4 rows of seat-like rectangles */}
            {[0,1,2].map(col => [0,1,2,3].map(row => (
              <rect
                key={`${col}-${row}`}
                x={col * 9 + 0.5}
                y={row * 6 + 0.5}
                width="7"
                height="4"
                rx="1.5"
                fill="#1a1a1a"
              />
            )))}
          </svg>
        </div>

        {/* Arrow button */}
        <button style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} aria-label="Open 3D view">
          <ArrowUpRight size={13} color="#fff" strokeWidth={2.5} />
        </button>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
          3D Rendering
        </div>
        <div style={{ fontSize: '0.72rem', color: '#6b7280', lineHeight: 1.6 }}>
          Recorre la cabina de tu avión con visualización 3D y siente lo que te espera a bordo.
        </div>
      </div>
    </div>
  );
}
