// Mobile-only legend
export default function SeatLegend() {
  return (
    <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '8px 0 10px' }}>
      <LegendItem color="#d4d6db" shape="rect" label="Disponible" />
      <LegendItem color="#9ca3af" shape="rect" label="Ocupado" />
      <LegendItem color="#6c47ff" shape="circle" label="Tu selección" />
    </div>
  );
}

function LegendItem({ color, shape, label }: { color: string; shape: 'rect' | 'circle'; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '10px', height: '10px', background: color, borderRadius: shape === 'circle' ? '50%' : '2px', flexShrink: 0 }} aria-hidden="true" />
      <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500 }}>{label}</span>
    </div>
  );
}
