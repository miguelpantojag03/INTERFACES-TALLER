import { ArrowLeft } from 'lucide-react';

interface HeaderProps { onBack?: () => void; }

export default function Header({ onBack }: HeaderProps) {
  return (
    <>
      {/* ── DESKTOP ── */}
      <div className="hidden lg:flex items-start justify-between mb-6">
        <div>
          <h1 style={{ fontSize: '2.35rem', fontWeight: 800, color: '#0a0a0a', lineHeight: 1, letterSpacing: '-0.5px', margin: 0 }}>
            Choose Seats
          </h1>
          <p style={{ fontSize: '11px', fontWeight: 500, color: '#adb5bd', marginTop: '8px', letterSpacing: '0.02em' }}>
            BOG → MDE &nbsp;·&nbsp; A320NEO &nbsp;·&nbsp; 12 SEP
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '2px' }}>
          {/* Check-in status — no visible pill background, just dot + text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#4ade80', display: 'inline-block', flexShrink: 0
            }} aria-hidden="true" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}>
              Check-in abierto
            </span>
          </div>

          {/* Avatar — tan bg, thick dark border */}
          <div
            style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: '#c8a87a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: 700, color: '#3d2000',
              outline: '3px solid #111', outlineOffset: '0px',
              userSelect: 'none', flexShrink: 0,
            }}
            aria-label="User JR"
          >
            JR
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 16px 10px' }}>
        <button
          onClick={onBack}
          style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          aria-label="Go back"
        >
          <ArrowLeft size={15} color="#374151" strokeWidth={2.5} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0a0a0a', lineHeight: 1.2 }}>Choose Seats</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500, marginTop: '2px' }}>BOG → MDE · 12 SEP</div>
        </div>

        <div
          style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#c8a87a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#3d2000', outline: '2.5px solid #111', flexShrink: 0 }}
          aria-label="User JR"
        >
          JR
        </div>
      </div>
    </>
  );
}
