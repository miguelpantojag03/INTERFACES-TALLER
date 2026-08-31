import type { SectionData } from '../types';

interface SectionSelectorProps {
  sections: SectionData[];
  activeSection: number;
  onSectionChange: (id: number) => void;
}

export default function SectionSelector({
  sections,
  activeSection,
  onSectionChange,
}: SectionSelectorProps) {
  return (
    <div className="flex items-center gap-2 w-full mb-5 lg:mb-6">
      {/* Label – desktop only */}
      <span className="hidden lg:block text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mr-1 whitespace-nowrap">
        Sections
      </span>

      {/* Pills */}
      <div className="flex gap-2 flex-1 lg:flex-none">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => onSectionChange(sec.id)}
            aria-pressed={activeSection === sec.id}
            className={`
              flex-1 lg:flex-none lg:w-14 h-10 rounded-full text-sm font-semibold
              transition-all duration-200 active:scale-95
              ${
                activeSection === sec.id
                  ? 'bg-gray-950 text-white shadow-md'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Legend – desktop only (right side) */}
      <div className="hidden lg:flex items-center gap-4 ml-auto">
        <LegendItem color="bg-[#e2e5ea]" label="Available" />
        <LegendItem color="bg-[#b8bcc6]" label="Occupied" />
        <LegendItem color="bg-[#6c47ff]" label="Your selection" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3.5 h-3.5 rounded-sm ${color}`} aria-hidden="true" />
      <span className="text-xs text-gray-500 font-medium">{label}</span>
    </div>
  );
}
