import type { SectionData } from '../types';

interface Props {
  sections: SectionData[];
  activeSection: number;
  onSectionChange: (id: number) => void;
}

export default function SectionSelector({ sections, activeSection, onSectionChange }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', width: '100%' }}>

      {/* SECTIONS micro-label — desktop only */}
      <span className="hidden lg:block" style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Sections
      </span>

      {/* Pills */}
      <div style={{ display: 'flex', gap: '8px', flex: '1 1 auto' }} className="lg:flex-none">
        {sections.map(sec => (
          <button
            key={sec.id}
            onClick={() => onSectionChange(sec.id)}
            aria-pressed={activeSection === sec.id}
            style={{
              flex: '1 1 0',
              height: '40px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.18s',
              background: activeSection === sec.id ? '#111111' : '#efefef',
              color: activeSection === sec.id ? '#fff' : '#6b7280',
              outline: 'none',
            }}
            className="lg:flex-none lg:w-[52px] active:scale-95"
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Legend — desktop right side */}
      <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '16px', marginLeft: 'auto', flexShrink: 0 }}>
        <LegendItem dot="rect" color="#d4d6db" label="Disponible" />
        <LegendItem dot="rect" color="#9ca3af" label="Ocupado" />
        <LegendItem dot="circle" color="#6c47ff" label="Tu selección" />
      </div>
    </div>
  );
}

function LegendItem({ dot, color, label }: { dot: 'rect' | 'circle'; color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{
        width: '10px', height: '10px', flexShrink: 0,
        background: color,
        borderRadius: dot === 'circle' ? '50%' : '2px',
      }} aria-hidden="true" />
      <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500 }}>{label}</span>
    </div>
  );
}
