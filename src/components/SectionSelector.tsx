import type { SectionData } from '../types';

interface Props {
  sections: SectionData[];
  activeSection: number;
  onSectionChange: (id: number) => void;
}

export default function SectionSelector({ sections, activeSection, onSectionChange }: Props) {
  return (
    <div className="flex items-center gap-3 w-full mb-5">
      {/* "SECTIONS" micro-label — desktop only */}
      <span className="hidden lg:block text-[10px] font-bold text-[#9ca3af] tracking-[0.16em] uppercase shrink-0">
        Sections
      </span>

      {/* Pills */}
      <div className="flex gap-2 flex-1 lg:flex-none">
        {sections.map(sec => (
          <button
            key={sec.id}
            onClick={() => onSectionChange(sec.id)}
            aria-pressed={activeSection === sec.id}
            className={`
              flex-1 lg:flex-none lg:w-[52px] h-10 rounded-full text-sm font-semibold
              transition-all duration-200 active:scale-95
              ${activeSection === sec.id
                ? 'bg-[#111] text-white'
                : 'bg-[#f0f0f0] text-[#6b7280] hover:bg-[#e5e5e5]'
              }
            `}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Legend — desktop right */}
      <div className="hidden lg:flex items-center gap-4 ml-auto">
        <LegendDot color="#d1d5db" label="Disponible" />
        <LegendDot color="#9ca3af" label="Ocupado" />
        <LegendDot color="#6c47ff" label="Tu selección" round />
      </div>
    </div>
  );
}

function LegendDot({ color, label, round }: { color: string; label: string; round?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={round ? 'w-2.5 h-2.5 rounded-full' : 'w-2.5 h-2.5 rounded-sm'}
        style={{ background: color }}
        aria-hidden="true"
      />
      <span className="text-[11px] text-[#9ca3af] font-medium">{label}</span>
    </div>
  );
}
