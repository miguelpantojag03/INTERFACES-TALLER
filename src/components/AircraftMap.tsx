import { Diamond, Anchor } from 'lucide-react';

interface AircraftMapProps { activeSection: number; }

const SECTIONS = [
  { id: 1, label: 'BUSINESS', leftPct: 10, widthPct: 24 },
  { id: 2, label: 'PREMIUM',  leftPct: 36, widthPct: 20 },
  { id: 3, label: 'ECONOMY',  leftPct: 58, widthPct: 30 },
];

export default function AircraftMap({ activeSection }: AircraftMapProps) {
  const active = SECTIONS.find(s => s.id === activeSection)!;
  const midPct = active.leftPct + active.widthPct / 2;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      borderRadius: '20px',
      background: 'linear-gradient(150deg,#f6f6f8 0%,#e9e9ec 100%)',
      overflow: 'hidden',
      marginBottom: '20px',
      minHeight: '145px',
    }}>
      {/* Desktop left control buttons */}
      <div className="hidden lg:flex" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', flexDirection: 'column', gap: '10px', zIndex: 10 }}>
        <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} aria-label="Diamond view">
          <Diamond size={13} color="#9ca3af" strokeWidth={1.5} />
        </button>
        <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} aria-label="Anchor view">
          <Anchor size={13} color="#9ca3af" strokeWidth={1.5} />
        </button>
      </div>

      {/* Aircraft visualisation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 80px 28px 70px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '560px' }}>

          {/* Active section label pill — above fuselage */}
          <div
            className="hidden lg:flex"
            style={{
              position: 'absolute',
              left: `${midPct}%`,
              transform: 'translateX(-50%)',
              top: '-22px',
              justifyContent: 'center',
            }}
          >
            <div style={{
              background: '#111',
              color: '#fff',
              fontSize: '8px',
              fontWeight: 800,
              letterSpacing: '0.16em',
              padding: '3px 10px',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
            }}>
              {active.label}
            </div>
          </div>

          {/* ── Fuselage ── */}
          <div style={{ display: 'flex', alignItems: 'stretch', height: '48px', position: 'relative' }}>

            {/* Nose */}
            <div style={{
              flexShrink: 0,
              width: 'clamp(56px,10vw,80px)',
              background: '#fff',
              borderRadius: '50% 0 0 50%',
              border: '1px solid rgba(210,210,215,0.8)',
              borderRight: 'none',
              boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
            }} aria-hidden="true" />

            {/* Body */}
            <div style={{
              flex: 1,
              background: '#fff',
              borderTop: '1px solid rgba(210,210,215,0.8)',
              borderBottom: '1px solid rgba(210,210,215,0.8)',
              position: 'relative',
              overflow: 'visible',
            }} aria-hidden="true">

              {/* Section boxes */}
              {SECTIONS.map(sec => (
                <div key={sec.id} style={{
                  position: 'absolute',
                  top: '4px',
                  bottom: '4px',
                  left: `${sec.leftPct}%`,
                  width: `${sec.widthPct}%`,
                  borderRadius: '8px',
                  border: sec.id === activeSection
                    ? '2px solid #1a1a1a'
                    : '1px solid rgba(185,185,192,0.5)',
                  background: sec.id === activeSection
                    ? 'rgba(230,230,235,0.5)'
                    : 'transparent',
                  transition: 'all 0.25s',
                }} />
              ))}

              {/* Seat dot row */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 8px', gap: '2px' }}>
                {Array.from({ length: 38 }).map((_, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: i < 8 ? '5px' : '3px',
                    borderRadius: '99px',
                    background: i < 8
                      ? 'rgba(108,71,255,0.5)'
                      : i < 16
                      ? 'rgba(130,130,140,0.4)'
                      : 'rgba(185,185,195,0.4)',
                  }} />
                ))}
              </div>
            </div>

            {/* Tail */}
            <div style={{
              flexShrink: 0,
              width: 'clamp(30px,5vw,46px)',
              background: '#fff',
              borderRadius: '0 35% 35% 0',
              border: '1px solid rgba(210,210,215,0.8)',
              borderLeft: 'none',
              boxShadow: '-2px 0 8px rgba(0,0,0,0.04)',
            }} aria-hidden="true" />
          </div>

          {/* Wings */}
          <div style={{ position: 'absolute', top: 0, height: '48px', left: '25%', width: '22%', pointerEvents: 'none' }} aria-hidden="true">
            <div style={{
              position: 'absolute', width: '100%',
              height: 'clamp(18px,4vw,26px)',
              bottom: '100%', marginBottom: '-4px',
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(200,200,205,0.6)',
              clipPath: 'polygon(16% 100%,100% 100%,64% 0%,2% 0%)',
            }} />
            <div style={{
              position: 'absolute', width: '100%',
              height: 'clamp(18px,4vw,26px)',
              top: '100%', marginTop: '-4px',
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(200,200,205,0.6)',
              clipPath: 'polygon(2% 0%,64% 100%,100% 0%,16% 0%)',
            }} />
          </div>

        </div>
      </div>
    </div>
  );
}
