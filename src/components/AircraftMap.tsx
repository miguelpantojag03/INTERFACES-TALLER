import { Diamond, Anchor } from 'lucide-react';

interface AircraftMapProps {
  activeSection: number;
}

/* Sections: left%, width% of the fuselage bar */
const SECTIONS = [
  { id: 1, label: 'BUSINESS', left: 7,  width: 23 },
  { id: 2, label: 'PREMIUM',  left: 31, width: 21 },
  { id: 3, label: 'ECONOMY',  left: 54, width: 33 },
];

export default function AircraftMap({ activeSection }: AircraftMapProps) {
  const active = SECTIONS.find(s => s.id === activeSection)!;

  return (
    <div
      className="relative w-full rounded-2xl lg:rounded-3xl mb-5 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #f7f7f8 0%, #e8e8ea 100%)',
        minHeight: '130px',
      }}
    >
      {/* Left control buttons (desktop only) */}
      <div className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 flex-col gap-2.5 z-10">
        <button
          className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm
                     flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Diamond view"
        >
          <Diamond size={13} className="text-gray-500" strokeWidth={1.5} />
        </button>
        <button
          className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm
                     flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Anchor view"
        >
          <Anchor size={13} className="text-gray-500" strokeWidth={1.5} />
        </button>
      </div>

      {/* Aircraft body container */}
      <div className="flex items-center justify-center h-full py-6 lg:py-8 px-14 lg:px-24">
        <div className="relative w-full" style={{ maxWidth: '580px' }}>

          {/* BUSINESS/PREMIUM/ECONOMY label pill above active section — desktop only */}
          <div
            className="hidden lg:block absolute pointer-events-none"
            style={{
              left: `${active.left + active.width / 2}%`,
              transform: 'translateX(-50%)',
              top: '-22px',
            }}
          >
            <div
              className="bg-[#111] text-white rounded-full px-3 py-[3px] whitespace-nowrap"
              style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '0.18em' }}
            >
              {active.label}
            </div>
          </div>

          {/* ── Fuselage ── */}
          <div className="relative flex items-stretch" style={{ height: '44px' }}>

            {/* Nose cap */}
            <div
              className="shrink-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              style={{
                width: 'clamp(52px, 10vw, 76px)',
                borderRadius: '50% 0 0 50%',
                border: '1px solid rgba(200,200,205,0.7)',
                borderRight: 'none',
              }}
              aria-hidden="true"
            />

            {/* Main body */}
            <div
              className="relative flex-1 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              style={{ borderTop: '1px solid rgba(200,200,205,0.7)', borderBottom: '1px solid rgba(200,200,205,0.7)' }}
              aria-hidden="true"
            >
              {/* Section highlight boxes */}
              {SECTIONS.map(sec => (
                <div
                  key={sec.id}
                  className="absolute top-[3px] bottom-[3px] rounded-lg transition-all duration-300"
                  style={{
                    left: `${sec.left}%`,
                    width: `${sec.width}%`,
                    border: sec.id === activeSection
                      ? '2px solid #1a1a1a'
                      : '1px solid rgba(180,180,185,0.5)',
                    background: sec.id === activeSection ? 'rgba(220,220,225,0.4)' : 'transparent',
                  }}
                />
              ))}

              {/* Seat dots */}
              <div className="absolute inset-0 flex items-center px-2 gap-[2px]">
                {Array.from({ length: 38 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full"
                    style={{
                      height: i < 8 ? '5px' : '3px',
                      background: i < 8
                        ? 'rgba(108,71,255,0.55)'
                        : i < 16
                        ? 'rgba(130,130,140,0.45)'
                        : 'rgba(180,180,188,0.35)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Tail cap */}
            <div
              className="shrink-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              style={{
                width: 'clamp(28px, 5vw, 42px)',
                borderRadius: '0 35% 35% 0',
                border: '1px solid rgba(200,200,205,0.7)',
                borderLeft: 'none',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Wings */}
          <div
            className="absolute pointer-events-none"
            style={{ left: '24%', width: '23%', top: 0, height: '44px' }}
            aria-hidden="true"
          >
            {/* Upper wing */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: 'clamp(18px, 4vw, 28px)',
                bottom: '100%',
                marginBottom: '-3px',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(190,190,195,0.5)',
                clipPath: 'polygon(18% 100%, 100% 100%, 62% 0%, 3% 0%)',
              }}
            />
            {/* Lower wing */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: 'clamp(18px, 4vw, 28px)',
                top: '100%',
                marginTop: '-3px',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(190,190,195,0.5)',
                clipPath: 'polygon(3% 0%, 62% 100%, 100% 0%, 18% 0%)',
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
