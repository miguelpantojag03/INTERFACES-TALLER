import { Diamond, Anchor } from 'lucide-react';

interface AircraftMapProps {
  activeSection: number;
}

export default function AircraftMap({ activeSection }: AircraftMapProps) {
  const sectionPositions = [
    { id: 1, left: '8%',  width: '22%' },
    { id: 2, left: '32%', width: '22%' },
    { id: 3, left: '56%', width: '30%' },
  ];

  const sectionLabels: Record<number, string> = {
    1: 'BUSINESS',
    2: 'PREMIUM',
    3: 'ECONOMY',
  };

  return (
    <div
      className="relative w-full rounded-2xl lg:rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/60 overflow-hidden mb-4 lg:mb-5"
      style={{ minHeight: '100px' }}
    >
      {/* Desktop left controls */}
      <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col gap-2.5 z-10">
        <button
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Diamond view"
        >
          <Diamond size={14} className="text-gray-500" />
        </button>
        <button
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Anchor view"
        >
          <Anchor size={14} className="text-gray-500" />
        </button>
      </div>

      {/* Aircraft body */}
      <div className="flex items-center justify-center w-full h-full py-5 lg:py-8 px-12 lg:px-20">
        <div className="relative w-full" style={{ maxWidth: '580px' }}>

          {/* Fuselage */}
          <div className="relative flex items-center">

            {/* Nose */}
            <div
              className="flex-shrink-0 h-9 lg:h-12 bg-white border border-gray-300/60 shadow-sm"
              style={{
                width: 'clamp(2.5rem, 8vw, 5rem)',
                borderRadius: '50% 0 0 50%',
                borderRight: 'none',
              }}
              aria-hidden="true"
            />

            {/* Main fuselage */}
            <div className="relative flex-1 h-9 lg:h-12 bg-white border-t border-b border-gray-300/60 shadow-sm overflow-visible">

              {/* Section label above fuselage – desktop only */}
              <div className="hidden lg:block absolute -top-7 left-0 right-0">
                {sectionPositions.map(
                  (sec) =>
                    sec.id === activeSection && (
                      <div
                        key={sec.id}
                        className="absolute -translate-x-1/2 bg-gray-950 text-white text-[9px] font-bold tracking-widest px-2.5 py-0.5 rounded-full"
                        style={{ left: `calc(${sec.left} + ${sec.width} / 2)` }}
                      >
                        {sectionLabels[sec.id]}
                      </div>
                    )
                )}
              </div>

              {/* Section highlight boxes */}
              {sectionPositions.map((sec) => (
                <div
                  key={sec.id}
                  className={`absolute top-0.5 bottom-0.5 rounded-md transition-all duration-300 ${
                    sec.id === activeSection
                      ? 'border-2 border-gray-800 bg-gray-100/80'
                      : 'border border-gray-200 bg-transparent'
                  }`}
                  style={{ left: sec.left, width: sec.width }}
                  aria-hidden="true"
                />
              ))}

              {/* Seat dots */}
              <div
                className="absolute inset-0 flex items-center px-2 gap-px"
                aria-hidden="true"
              >
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${
                      i < 8
                        ? 'bg-[#6c47ff]/60'
                        : i < 16
                        ? 'bg-gray-400/60'
                        : 'bg-gray-300/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Tail */}
            <div
              className="flex-shrink-0 h-9 lg:h-12 bg-white border border-gray-300/60 shadow-sm"
              style={{
                width: 'clamp(2rem, 5vw, 3rem)',
                borderRadius: '0 30% 30% 0',
                borderLeft: 'none',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Wings — percentage based, no fixed px that overflow small screens */}
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: '28%', width: '22%' }}
            aria-hidden="true"
          >
            {/* Upper wing */}
            <div
              className="absolute w-full bg-white/80 border border-gray-300/50"
              style={{
                height: 'clamp(16px, 3.5vw, 28px)',
                top: 'calc(-1 * clamp(22px, 5vw, 36px))',
                clipPath: 'polygon(20% 100%, 100% 100%, 60% 0%, 0% 0%)',
              }}
            />
            {/* Lower wing */}
            <div
              className="absolute w-full bg-white/80 border border-gray-300/50"
              style={{
                height: 'clamp(16px, 3.5vw, 28px)',
                top: 'calc(clamp(12px, 3vw, 20px))',
                clipPath: 'polygon(0% 0%, 60% 100%, 100% 0%, 20% 0%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
